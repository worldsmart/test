const express = require('express');
const router = express.Router();
const { Order, Activity, Address, Country, Zone } = require('../db/index');
const { Op } = require('sequelize');

router.get('/', (req, res, next)=>{
    Order.findOne({
        where: {
            id: req.query.id
        },
        include:[
            {
                model: Activity,
                include: [
                    {
                        model: Address,
                        include: [
                            {
                                model: Country
                            }
                        ]
                    }
                ]
            }
        ]
    }).then((order)=>{
        if(!order){
            res.json({err:'err'});
            return;
        }
        let unloading_zip_code = '';
        for(let i = 0;i < order.dataValues.activities.length;i++){
            if(order.dataValues.activities[i].dataValues.type == 'unloading'){
                unloading_zip_code = order.dataValues.activities[i].dataValues.address.dataValues.zip_code;
            }
        }
        Zone.findOne({
            where: {
                client_id: order.dataValues.customer_code,
                zip_code_list: {
                    [Op.contains]: [unloading_zip_code]
                }
            }
        }).then((zone)=>{
            if(!zone){
                zone = {
                    plangroup: 'Default plangroup'
                }
            }
            res.json({
                order:order,
                zone: zone
            });
        });
    });
});

module.exports = router;