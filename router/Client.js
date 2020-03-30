const express = require('express');
const router = express.Router();
const { Client, Ftp_settings, Order, Zone, Customer } = require('../db/index');
const fs = require('fs');
const path = require('path');

router.put('/', (req, res, next)=>{
    let data = req.body;
    if(data.name && data.slim_id && data.parser){
        if(data.id){
            Client.update({
                name: data.name,
                sync: data.sync,
                slim_id: data.slim_id,
                parser: data.parser
            },{
                where: {
                    id: data.id
                }
            }).then((client)=>{
                if(!client){
                    res.json({err:'err'});
                    return;
                }
                res.json({client:client});
            });
        }else {
            Client.create({
                name: data.name,
                sync: data.sync,
                customer_id: data.customer_id,
                slim_id: data.slim_id,
                parser: data.parser
            }).then((client)=>{
                if(!client){
                    res.json({err:'err'});
                    return;
                }
                Ftp_settings.create({
                    client_id: client.dataValues.id,
                    name: data.ftp_name,
                    host: data.host,
                    port: data.port,
                    user: data.username,
                    password: data.password,
                    done_path: data.done_path,
                    err_path: data.err_path,
                    data_path: data.data_path
                }).then((ftp=>{
                    if(!ftp){
                        res.status(500).send('Can`t create client due DB err');
                        return;
                    }
                    resClient = client.dataValues;
                    resClient.Ftp_setting = ftp.dataValues;
                    res.json({client:resClient});
                }));
            });
        }
    }else{
        res.status(400).send('Fields [name, slim_id, parser] are requered');
    }
});

router.get('/', (req, res, next)=>{
    let options = {
        order: [
            ['id', 'DESC']
        ],
        include: [{
            model: Ftp_settings,
        }]
    };
    if(req.query.id){
        options.where = {
            customer_id: req.query.id
        };
    }
    Client.findAll(options).then((clients)=>{
        if(!clients){
            res.json({err:'err'});
            return;
        }
        res.json({clients:clients});
    });
});

router.get('/profile', (req, res, next)=>{
    Client.findOne({
        where: {
            id: req.query.id
        },
        include: [
            {
                model: Ftp_settings
            },
            {
                model: Customer
            },
            {
                model: Order,
                order: [
                    ['id', 'DESC']
                ]
            },
            {
                model: Zone
            }
        ]
    }).then((client)=>{
        if(!client){
            res.json({err:'err'});
            return;
        }
        res.json({client:client});
    });
});

router.delete('/', (req, res)=>{
    if(req.query.id){
        Client.destroy({
            where:{
                id: req.query.id
            }
        }).then(r=>{
            if(r){
                res.json({})
            }else {
                res.status(400).send('No client with such id');
            }
        });
    }else {
        res.status(400).send('Id query param required');
    }
});

router.get('/parser_list', (req, res)=>{
    let dir = path.join(process.env.root, 'src', 'middleware', 'parser');
    fs.readdir(dir, (err, files)=>{
        if(err){
            res.status(500);
        }else{
            res.json({files: files})
        }
    });
});

module.exports = router;