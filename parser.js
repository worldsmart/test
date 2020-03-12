const parser = require('xml2js');
const path = require('path');
const fs = require('fs');
const {Client, Order} = require('./db/index');



const express = require('express');

let app = express();

app.get('/parse', (req, res)=>{
    let filedata = fs.readFileSync(path.join(__dirname, 'ex.xml'), 'utf8');

    parser.parseString(filedata, function (err, result) {
        for(let i = 0;i < result['Subcontractors']['Subcontractor'].length;i++){
            let Subcontractor = result['Subcontractors']['Subcontractor'][i];
            Client.create({
                name: Subcontractor['SubcontractorName'][0],
                sync: true
            }).then(client=>{
                if(!client){
                    console.error('Failed client creation');
                    return;
                }
                console.log('client id: ' + client.id);
                for(let y = 0;y < Subcontractor['Shipment'].length;y++){
                    let Shipment = Subcontractor['Shipment'][y];
                    /*Order.create({
                        name: Shipment['ShipmentID'][0],
                        date: new Date(),
                        units: Shipment['Cargoline'][0]['CargolineUnit'][0]
                    }).then(order=>{
                        if(!order){
                            console.error('Failed client creation');
                            return;
                        }
                        console.log('order id: ' + order.id);
                    });*/
                }
            });
        }

        res.json(result['Subcontractors']['Subcontractor'][0]['Shipment'][0]);
    });
});

app.listen(8081, ()=>{
   console.log('Server started');
});
