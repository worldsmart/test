const express = require('express');
const router = express.Router();
const { Client, Ftp_settings, Order, Zone } = require('../db/index');

router.put('/', (req, res, next)=>{
    let data = req.body;
    if(data.name){
        if(data.id){
            Client.update({
                name: data.name,
                sync: data.sync,
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
                customer_id: data.customer_id
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
                        res.json({err:'err'});
                        return;
                    }
                    res.json({client:client});
                }));
            });
        }
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

module.exports = router;