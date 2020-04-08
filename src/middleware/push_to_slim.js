const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async (data, id, org_id)=>{
    console.log('start pushing orders for user with SLIM Id: ' + id);
    let logs = require('./log/push_to_slim');
    let log = {
        start: new Date(),
        client_slim_id: id
    };

    let orders = [];
    for(let i = 0;i < data.length;i++){
        orders = orders.concat(data[i]);
    }

    log.orders_count = orders.length;

    log.orders_pushed = 0;

    log.orders_failed = 0;

    log.failed_orders = [];

    if(id && org_id){
        for(let i = 0;i < orders.length;i++){

            let tmp = {};

            for(let y = 0;y < orders[i].activity.length;y++){
                tmp[orders[i].activity[y].type] = orders[i].activity[y];
            }

            orders[i].activity = tmp;

            let r;
            try{
                r = await axios.post('http://localhost:8082/ws/SF_SLIM_OrderControl', `
                <soap:Envelope 
                xmlns:tns="http://www.example.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
                    <soap:Header>
                        <tns:authentication>
                            <username>WS_Modality</username>
                            <password>Roma123</password>
                        </tns:authentication>
                    </soap:Header>
                    <soap:Body>
                        <tns:ImportOrder>
                            <SLIM_Root>
                                <Order>
                                    <OrderNumber>${orders[i].name}</OrderNumber>
                                    <CustomerCode>${id}</CustomerCode>
                                    <Name></Name>
                                    <DebtorNr>${orders[i].debtorNr}</DebtorNr>
                                    <Date>${orders[i].date.toISOString()}</Date>
                                    <Units>${orders[i].units}</Units>
                                    <Weight>${orders[i].weight}</Weight>
                                    <Volume>${orders[i].volume}</Volume>
                                    <LoadMeters>${orders[i].load_meters}</LoadMeters>
                                    <Description>${orders[i].description}</Description>
                                    <Activity>
                                        <ActivityType>${orders[i].activity.loading.type}</ActivityType>
                                        <Name>${orders[i].activity.loading.name}</Name>
                                        <ExtraAddress></ExtraAddress>
                                        <Streetname>${orders[i].activity.loading.address.street}</Streetname>
                                        <HouseNumber>${orders[i].activity.loading.address.house_number}</HouseNumber>
                                        <ZipCode>${orders[i].activity.loading.address.zip_code}</ZipCode>
                                        <City>${orders[i].activity.loading.address.city}</City>
                                        <Latitude>${Number(orders[i].activity.loading.address.latitude)}</Latitude>
                                        <Longitude>${Number(orders[i].activity.loading.address.longitude)}</Longitude>
                                        <AddressCode>${orders[i].activity.loading.address.id}</AddressCode>
                                        <Phone>${orders[i].activity.loading.phone}</Phone>
                                        <Contactperson>${orders[i].activity.loading.contact_person}</Contactperson>
                                        <Remarks>${orders[i].activity.loading.remarks}</Remarks>
                                        <Date>${orders[i].activity.loading.date.toISOString()}</Date>
                                        <DateFrom>${orders[i].activity.unloading.date.toISOString()}</DateFrom>
                                        <DateTill>${orders[i].activity.unloading.date.toISOString()}</DateTill>
                                        <TimeFrom>${orders[i].activity.loading.time_from}</TimeFrom>
                                        <TimeTill>${orders[i].activity.loading.time_till}</TimeTill>
                                        <AddressBlock></AddressBlock>
                                        <Sequence>${Number(orders[i].activity.loading.sequence)}</Sequence>
                                    </Activity>
                                    <Activity>
                                        <ActivityType>${orders[i].activity.unloading.type}</ActivityType>
                                        <Name>${orders[i].activity.unloading.name}</Name>
                                        <ExtraAddress></ExtraAddress>
                                        <Streetname>${orders[i].activity.unloading.address.street}</Streetname>
                                        <HouseNumber>${orders[i].activity.unloading.address.house_number}</HouseNumber>
                                        <ZipCode>${orders[i].activity.unloading.address.zip_code}</ZipCode>
                                        <City>${orders[i].activity.unloading.address.city}</City>
                                        <Latitude>${Number(orders[i].activity.unloading.address.latitude)}</Latitude>
                                        <Longitude>${Number(orders[i].activity.unloading.address.longitude)}</Longitude>
                                        <AddressCode>${orders[i].activity.unloading.address.id}</AddressCode>
                                        <Phone>${orders[i].activity.unloading.phone}</Phone>
                                        <Contactperson>${orders[i].activity.unloading.contact_person}</Contactperson>
                                        <Remarks>${orders[i].activity.unloading.remarks}</Remarks>
                                        <Date>${orders[i].activity.unloading.date.toISOString()}</Date>
                                        <DateFrom>${orders[i].activity.unloading.date.toISOString()}</DateFrom>
                                        <DateTill>${orders[i].activity.unloading.date.toISOString()}</DateTill>
                                        <TimeFrom>${orders[i].activity.unloading.time_from}</TimeFrom>
                                        <TimeTill>${orders[i].activity.unloading.time_till}</TimeTill>
                                        <AddressBlock></AddressBlock>
                                        <Sequence>${Number(orders[i].activity.unloading.sequence)}</Sequence>
                                    </Activity>
                                    <OrderType>${orders[i].order_type}</OrderType>
                                    <TransportType>${orders[i].transport_type}</TransportType>
                                    <Plangroup>${orders[i].plangroup}</Plangroup>
                                    <Cargo>${orders[i].cargo}</Cargo>
                                    <ReuseAddress>${!!orders[i].reuse_address}</ReuseAddress>
                                    <Source>${orders[i].source}</Source>
                                </Order>
                            </SLIM_Root>
                            <Organisation>${org_id}</Organisation>
                        </tns:ImportOrder>
                    </soap:Body>
                </soap:Envelope>
                `, {
                    headers: {'content-type': 'text/xml'}
                });
            }catch(e){
                console.log(e);
                log.orders_failed++;
                log.failed_orders.push(orders[i]);
                continue;
            }

            if(r.status == 200){
                log.orders_pushed++;
            }else{
                log.orders_failed++;
                log.failed_orders.push(orders[i]);
                continue;
            }
        }
    }else{
        console.log('Pushing err: clients SLIM id or SLIM organisation id in not defined');
        log.orders_failed = orders.length;
        log.failed_orders = orders;
    }

    console.log('pushing ended');
    log.end = new Date();
    logs.push(log);
    fs.writeFileSync(path.join(process.env.root, 'src', 'middleware', 'log', 'push_to_slim.json'), JSON.stringify(logs, null, '\t'));
};