const express = require('express');
const router = express.Router();
const { Ftp_settings, Order, Activity, Address, Country } = require('../db/index');
const parser = require('../parser');
const ftp = require("basic-ftp");
const fs = require('fs');
const path = require('path');

router.get('/xml', (req, res, next)=>{
    if(!req.query.id){
        res.status(400).send('Query parameter id required');
    }else {
        Ftp_settings.findOne({
            where: {
                client_id: req.query.id
            }
        }).then(settings=>{
            if(!settings){
                res.status(400).send('No ftp setting for user with id ' + req.query.id);
                return;
            }
            settings = settings.dataValues;
            const client = new ftp.Client();
            client.ftp.verbose = true;
            let options = {
                host: settings.host,
                user: settings.user,
                password: settings.password,
                secure: true,
                secureOptions : { rejectUnauthorized : false}
            };
            if(settings.port){
                options.port = settings.port;
            }
            client.access(options).then((r)=>{
                if(!r){
                    client.close();
                    res.status(500).send('FTPS connection err');
                }
                let dir = path.join(process.env.root, '/ftp/', req.query.id);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                client.downloadTo(`./ftp/${req.query.id}/data.xml`, "test.xml").then(r=>{
                    if(!r && r.code != 226){
                        res.status(500).send('FTPS file copying err');
                        return;
                    }

                    parser(fs.readFileSync(`./ftp/${req.query.id}/data.xml`, 'utf8')).then((data)=>{

                        createOrders(data, req.query.id);

                        res.json({
                            msg: 'Orders successfully created'
                        });
                    });
                });
            }).catch(e=>{
                client.close();
                res.status(500).send('FTPS connection err: ' + e);
            });
        }).catch(e=>{
            res.status(500).send('Db err: ' + e);
        });
    }
});

router.put('/', (req, res, next)=>{
    console.log('Data captured', req.body);
    let data = req.body;
    Ftp_settings.update(data, {
        where: {
            id: data.id
        }
    }).then((ftp)=>{
        if(!ftp){
            res.json({err:'err'});
            return;
        }
        res.json({ftp:ftp});
    });
});

router.put('/load', (req, res, next)=>{
    let xml = req.files.xml.data.toString('utf8');
    parser(xml).then((data)=>{
        for(let i = 0;i < data.length;i++){
            Order.create({
                name: data[i].name,
                date: data[i].date,
                units: Number(data[i].units),
                weight: Number(data[i].weight),
                volume: Number(data[i].volume),
                load_meters: Number(data[i].load_meters),
                description: data[i].description,
                cargo: data[i].cargo,
                customer_code: Number(req.body.id),
                additional: data[i].additional
            }).then((order)=>{
                for(let key in data[i].activities){
                    Country.findOne({
                        where:{
                            code: data[i].activities[key].address.country
                        }
                    }).then((country)=>{
                        Address.create({
                            street: data[i].activities[key].address.street,
                            zip_code: data[i].activities[key].address.zip_code,
                            city: data[i].activities[key].address.city,
                            house_number: data[i].activities[key].address.house_number,
                            country_id: country.dataValues.id
                        }).then((address)=>{
                            let date = data[i].activities[key].date.split('-');
                            data[i].activities[key].date = date[2] + '-' + date[1] + '-' + date[0] + 'T00:00:00.000Z';
                            Activity.create({
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
                            }).then((activity)=>{

                            })
                        });
                    });
                }
            });
        }

        res.json({
            res: data
        });
    });
});

async function createOrders(data, client_id){
    for(let i = 0;i < data.length;i++){
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

        for(let key in data[i].activities){
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
        }
    }
}

module.exports = router;