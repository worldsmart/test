const express = require('express');
const router = express.Router();
const { Customer, Client, Ftp_settings } = require('../db/index');

router.put('/', (req, res, next)=>{
    let data = req.body;
    if(data.name && data.slim_id){
        if(req.query.id){
            Customer.update({
                name: data.name,
                slim_organisation_id: data.slim_id,
                active: data.active
            },{
                where: {
                    id: req.query.id
                }
            }).then((customer)=>{
                if(!customer){
                    res.status(500).send('Can`t create customer due DB err');
                    return;
                }
                res.json({customer:customer});
            });
        }else {
            Customer.create({
                name: data.name,
                slim_organisation_id: data.slim_id,
                active: data.active
            }).then((customer)=>{
                if(!customer){
                    res.status(500).send('Can`t create customer due DB err');
                    return;
                }
                res.json({customer:customer});
            });
        }
    }else{
        res.status(400).send('Fields [name, slim_id] are requered');
    }
});

router.get('/', (req, res, next)=>{
    if(req.query.id){
        Customer.findOne({
            where: {
                id: req.query.id
            },
            include: [{
                model: Client,
                include: [{
                    model: Ftp_settings
                }]
            }]
        }).then((customer)=>{
            if(!customer){
                res.json({err:'err'});
                return;
            }
            res.json({customer:customer});
        });
    }else {
        Customer.findAll({
            order: [
                ['id', 'DESC']
            ]
        }).then((customers)=>{
            if(!customers){
                res.json({err:'err'});
                return;
            }
            res.json({customers:customers});
        });
    }
});

router.delete('/', (req, res)=>{
    if(req.query.id){
        Customer.destroy({
            where:{
                id: req.query.id
            }
        }).then(r=>{
            if(r){
                res.json({})
            }else {
                res.status(400).send('No customer with such id');
            }
        });
    }else {
        res.status(400).send('Id query param required');
    }
});

module.exports = router;