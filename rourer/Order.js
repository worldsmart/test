const express = require('express');
const router = express.Router();
const { Order, Activity, Address, Country } = require('../db/index');

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
        res.json({order:order});
    });
});

module.exports = router;