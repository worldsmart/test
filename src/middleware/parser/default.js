const parser = require('xml2js');

module.exports = (filedata)=>{
    return new Promise((resolve, reject) => {
        parser.parseString(filedata, function (err, result) {
            if(err){
                reject(err);
            }

            let parsed = [];
            let date = new Date();
            date.setUTCHours(0);
            date.setUTCMinutes(0);
            date.setUTCSeconds(0);
            date.setUTCMilliseconds(0);

            for(let i = 0;i < result['Subcontractors']['Subcontractor'][0]['Shipment'].length;i++){
                let shipment = result['Subcontractors']['Subcontractor'][0]['Shipment'][i];
                let order = {
                    name: shipment['ShipmentID'][0],
                    status: shipment['ShipmentStatus'][0],
                    date: date,
                    units: shipment['Cargoline'][0]['PackingQuantity'][0],
                    weight: shipment['Cargoline'][0]['CargolineWeight'][0],
                    volume: shipment['Cargoline'][0]['CargolineVolume'][0],
                    load_meters: shipment['Cargoline'][0]['CargolineLoadingMeters'][0],
                    description: shipment['Cargoline'][0]['CargolineDescription'][0],
                    cargo: shipment['Cargoline'][0]['CargolineUnit'][0],
                    activities:{
                        loading: {
                            name: shipment['LoadingName'][0],
                            phone: shipment['LoadingContactPhone'][0],
                            contact_person: shipment['LoadingContact'][0],
                            date: shipment['LoadingDate'][0],
                            time_from: shipment['LoadingTimeFrom'][0],
                            time_till: shipment['LoadingTimeTo'][0],
                            remarks: shipment['LoadingInstructions'][0],
                            address: {
                                street: shipment['LoadingAddress'][0].match(/(.*) (.*$)/m) ? shipment['LoadingAddress'][0].match(/(.*) (.*$)/m)[1] : shipment['LoadingAddress'][0],
                                zip_code: shipment['LoadingZipcode'][0],
                                city: shipment['LoadingCity'][0],
                                country: shipment['LoadingCountryCode'][0],
                                house_number: shipment['LoadingAddress'][0].match(/(.*) (.*$)/m) ? shipment['LoadingAddress'][0].match(/(.*) (.*$)/m)[2] : ''
                            }
                        },
                        unloading: {
                            name: shipment['UnloadingName'][0],
                            phone: shipment['UnloadingContactPhone'][0],
                            contact_person: shipment['UnloadingContact'][0],
                            date: shipment['UnloadingDate'][0],
                            time_from: shipment['UnloadingTimeFrom'][0],
                            time_till: shipment['UnloadingTimeTo'][0],
                            remarks: shipment['UnloadingInstructions'][0],
                            address: {
                                street: shipment['UnloadingAddress'][0].match(/(.*) (.*$)/m) ? shipment['UnloadingAddress'][0].match(/(.*) (.*$)/m)[1] : shipment['UnloadingAddress'][0],
                                zip_code: shipment['UnloadingZipcode'][0],
                                city: shipment['UnloadingCity'][0],
                                country: shipment['UnloadingCountryCode'][0],
                                house_number: shipment['UnloadingAddress'][0].match(/(.*) (.*$)/m) ? shipment['UnloadingAddress'][0].match(/(.*) (.*$)/m)[2] : ''
                            }
                        }
                    }
                };
                parsed.push(order);
            }
            resolve(parsed);
        });
    });
};