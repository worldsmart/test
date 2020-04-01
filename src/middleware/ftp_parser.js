const { Client, Ftp_settings, Order, Activity, Address, Country, Ftp_files, Customer, Zone } = require('../../db/index');
const fs = require('fs');
const path = require('path');
const ftp = require("basic-ftp");
const sftpClient = require('ssh2-sftp-client');
const { uuid } = require('uuidv4');
const push_to_slim = require('./push_to_slim');
const { Op } = require('sequelize');

module.exports = async ()=>{
    console.log('parsing ftp');

    let logs = require('./log/ftp_parser.json');

    let log = {
        start: new Date()
    };

    console.log('selecting client list from db ....');

    let clients;

    try{
        clients = await Client.findAll({
            include: [{
                model: Ftp_settings
            },
            {
                model: Customer
            }]
        });
    }catch (e) {
        console.log('db error');
        log.db_err = e;
        log.end = new Date();
        logs.push(log);
        saveLogs(logs);
        return ;
    }

    console.log('clients captured');

    log.client_processing = [];

    for(let i = 0;i < clients.length;i++){
        console.log('processing client with id: ' + clients[i].dataValues.id);

        let client = clients[i].dataValues;
        client.ftp_setting = client.ftp_setting.dataValues;
        let client_log = {
            client_id: client.id
        };

        if(!client.ftp_setting.host || !client.ftp_setting.user || !client.ftp_setting.password || !client.ftp_setting.done_path || !client.ftp_setting.err_path || !client.ftp_setting.data_path){
            client_log.status = 'skipped';
            client_log.reason = 'incorrect FTP settings'
        }else if(!client.parser){
            client_log.status = 'skipped';
            client_log.reason = 'parser is not defined'
        }else {
            let parser;

            try{
                parser = require(`./parser/${client.parser}`)
            }catch (e) {
                client_log.status = 'err';
                client_log.err = `could not GET ${client.parser} parser`;
                log.client_processing.push(client_log);
                continue;
            }

            console.log(`connecting to client ${client.id} ftp ...`);

            let ftpClient = new ftp.Client();
            let sftp = new sftpClient();
            let connection = undefined;

            /*ftpClient.ftp.verbose = true;*/ //logging of ftp connection

            let options = {
                host: client.ftp_setting.host,
                user: client.ftp_setting.user,
                password: client.ftp_setting.password,
                secure: true,
                secureOptions : { rejectUnauthorized : false}
            };

            if(client.ftp_setting.port){
                options.port = client.ftp_setting.port;
            }
            
            

            

             try{
                 connection = await ftpClient.access(options);
             }catch (e) {
                console.log('FTP connection error');
                client_log.status = 'err';
                 client_log.err = {
                     msg: `could not connect to FTP`,
                     err: e
                 };
                 log.client_processing.push(client_log);
                 continue;
             }

            if(connection.code != 220){
                console.log('Bad FTP connection status');
                client_log.status = 'err';
                client_log.err = `Bad FTP connection status`;
                log.client_processing.push(client_log);
                continue;
            }

            let dir = path.join(process.env.root, '/ftp/', client.id.toString());
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            console.log('starting checkup directories');

            //ftp dirs checkup
            let list;
            try{
                list = await ftpClient.list(client.ftp_setting.data_path);
            }catch (e) {
                console.log('Data dir not found');
                client_log.status = 'err';
                client_log.err = `Data dir not found`;
                log.client_processing.push(client_log);
                continue;
            }
            try{
                await ftpClient.list(client.ftp_setting.done_path);
            }catch (e) {
                console.log('Done dir not found');
                client_log.status = 'err';
                client_log.err = `Done dir not found`;
                log.client_processing.push(client_log);
                continue;
            }
            try{
                await ftpClient.list(client.ftp_setting.err_path);
            }catch (e) {
                console.log('Err dir not found');
                client_log.status = 'err';
                client_log.err = `Err dir not found`;
                log.client_processing.push(client_log);
                continue;
            }

            client_log.processed_files = [];

            let client_orders = [];

            for(let i in list){
                if(list[i].name.match(/.*\.xml$/)){
                    console.log('found file for parsing, start processing ....');
                    let filename = uuid() + '.xml';
                    let file_log = {
                        original_name: list[i].name,
                        local_name: filename
                    };

                    let r;
                    try{
                        r = await ftpClient.downloadTo(`./ftp/${client.id}/${filename}`, client.ftp_setting.data_path + '/' + list[i].name);
                    }catch (e) {
                        console.log('Download failed');
                        file_log.status = 'err';
                        file_log.err = {
                            msg: `Download failed`,
                            err: e
                        };
                        client_log.processed_files.push(file_log);
                        continue;
                    }
                    console.log('downloaded');

                    if(!r && r.code != 226){
                        await moveBadFile(ftpClient, `./ftp/${client.id}/${filename}`, client.ftp_setting.err_path + '/' + list[i].name, client.ftp_setting.data_path + '/' + list[i].name);
                        continue;
                    }

                    console.log('start parsing ...');
                    let data;
                    try {
                        data = await parser(fs.readFileSync(`./ftp/${client.id}/${filename}`, 'utf8'));
                    }catch (e) {
                        console.log('Parsing failed');
                        file_log.status = 'err';
                        file_log.err = {
                            msg: `Parsing failed`,
                            err: e
                        };
                        await moveBadFile(ftpClient, `./ftp/${client.id}/${filename}`, client.ftp_setting.err_path + '/' + list[i].name, client.ftp_setting.data_path + '/' + list[i].name);
                        client_log.processed_files.push(file_log);
                        continue;
                    }
                    console.log('parsing done');

                    console.log('saving data from file to DB');

                    let createdOrders;
                    try{
                        createdOrders = await createOrders(data, client.id);
                        await ftpClient.uploadFrom(`./ftp/${client.id}/${filename}`, client.ftp_setting.done_path + '/' + list[i].name);
                        await ftpClient.remove(client.ftp_setting.data_path + '/' + list[i].name);
                        await Ftp_files.create({
                            client_id: client.id,
                            local_name: filename,
                            original_name: list[i].name
                        });
                    }catch (e) {
                        console.log('Data save failed', e);
                        file_log.status = 'err';
                        file_log.err = {
                            msg: `Data save failed`,
                            err: e
                        };
                        await moveBadFile(ftpClient, `./ftp/${client.id}/${filename}`, client.ftp_setting.err_path + '/' + list[i].name, client.ftp_setting.data_path + '/' + list[i].name);
                        client_log.processed_files.push(file_log);
                        continue;
                    }

                    console.log('File processing done');
                    client_orders.push(createdOrders);
                    file_log.status = 'done';
                    client_log.processed_files.push(file_log);
                }
            }
            console.log('parsing clients FTP done');
            if(client_orders[0]){
                console.log('sending data to SLIM');
               // await push_to_slim(client_orders, client.slim_id, client.customer.dataValues.slim_organisation_id);
                console.log('sending completed');
            }
            client_log.status = 'done';
        }
        log.client_processing.push(client_log);
    }

    console.log('parsing done');
    log.end = new Date();
    logs.push(log);
    saveLogs(logs);
};

async function moveBadFile(client, file, badFilePath, path){
    await client.appendFrom(file, badFilePath);
    await client.remove(path);
}

function saveLogs(logs) {
    console.log('saving logs ...');
    fs.writeFileSync(path.join(process.env.root, 'src', 'middleware', 'log', 'ftp_parser.json'), JSON.stringify(logs, null, '\t'));
    console.log('done');
}

async function createOrders(data, client_id){
    let returnOrders = [];
    for(let i = 0;i < data.length;i++){
        let returnOrder;
        let order = await Order.create({
            name: data[i].name,
            date: data[i].date,
            units: Number(data[i].units),
            weight: Number(data[i].weight),
            volume: Number(data[i].volume),
            load_meters: Number(data[i].load_meters),
            description: data[i].description,
            cargo: data[i].cargo,
            customer_code: Number(client_id),
            additional: data[i].additional
        });

        returnOrder = order.dataValues;
        returnOrder.activity = [];

        for(let key in data[i].activities){
            let returnActivity;

            let country = await Country.findOne({
                where:{
                    code: data[i].activities[key].address.country
                }
            });
            let address = await Address.create({
                street: data[i].activities[key].address.street,
                zip_code: data[i].activities[key].address.zip_code,
                city: data[i].activities[key].address.city,
                house_number: data[i].activities[key].address.house_number,
                country_id: country.dataValues.id
            });

            let date = data[i].activities[key].date.split('-');
            data[i].activities[key].date = date[2] + '-' + date[1] + '-' + date[0] + 'T00:00:00.000Z';
            let activity = await Activity.create({
                type: key,
                name: data[i].activities[key].name,
                phone: data[i].activities[key].phone,
                contact_person: data[i].activities[key].contact_person,
                date: new Date(data[i].activities[key].date),
                time_from: data[i].activities[key].time_from,
                time_till: data[i].activities[key].time_till,
                remarks: data[i].activities[key].remarks,
                sequence: null,
                shipment_id: order.dataValues.id,
                address_id: address.dataValues.id
            });

            returnActivity = activity.dataValues;
            returnActivity.address = address.dataValues;

            let zip_zone = null;

            if(returnActivity.type == 'unloading'){
                zip_zone = await Zone.findOne({
                    where: {
                        client_id: client_id,
                        zip_code_list: {
                            [Op.contains]: [returnActivity.address.zip_code]
                        }
                    }
                });
            }

            if(zip_zone){
                returnOrder.plangroup = zip_zone.dataValues.plangroup;
            }else{
                returnOrder.plangroup = 'Kleine wielen';
            }

            returnActivity.address.country = country.dataValues;
            returnOrder.activity.push(returnActivity);
        }
        returnOrders.push(returnOrder);
    }
    return returnOrders;
}