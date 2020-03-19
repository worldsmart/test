const express = require('express');
const router = express.Router();
const { Ftp_settings, Order, Activity, Address, Country } = require('../db/index');
const parser = require('../parser');

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

module.exports = router;