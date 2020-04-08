const express = require('express');
const router = express.Router();
const parser = require('../src/middleware/parser/default');
const fs = require('fs');
const path = require('path');
const push_to_slim = require('../src/middleware/push_to_slim');
const axios = require('axios');

router.get('/', (req, res)=>{
    parser(fs.readFileSync(path.join(process.env.root, 'test.xml'))).then(data=>{
        push_to_slim([[{
            id: 14309,
            name: '501963510001',
            date: '2020-04-08T00:00:00.000Z',
            units: 0,
            weight: 2,
            volume: 0,
            load_meters: 0,
            description: 'Bevestigingsbeugels',
            cargo: 'T094033',
            customer_code: 5,
            additional: null,
            debtorNr: null,
            order_type: null,
            transport_type: null,
            plangroup: 'Default',
            reuse_address: null,
            source: null,
            activity: [
              {
                id: 28597,
                type: 'loading',
                name: 'ABEMEC TERNEUZEN',
                phone: '0115-692270',
                contact_person: 'MATTHEW V D LOO',
                date: '2020-04-08T00:00:00.000Z',
                time_from: '00:00',
                time_till: '00:00',
                remarks: '',
                sequence: null,
                shipment_id: 14309,
                address_id: 28599,
                address: {
                    id: 24770,
                    street: 'LANDBOUWWEG',
                    zip_code: '3899BG',
                    city: 'ZEEWOLDE',
                    house_number: '46',
                    country_id: 166,
                    latitude: null,
                    longitude: null,
                    valid_coordinates: null
                  }
              },
              {
                id: 28598,
                type: 'unloading',
                name: 'ABEMEC ZEEWOLDE voorheen Van Arendonk',
                phone: '',
                contact_person: '',
                date: '2020-04-08T00:00:00.000Z',
                time_from: '08:00',
                time_till: '13:00',
                remarks: '',
                sequence: null,
                shipment_id: 14309,
                address_id: 28600,
                address: {
                    id: 24770,
                    street: 'LANDBOUWWEG',
                    zip_code: '3899BG',
                    city: 'ZEEWOLDE',
                    house_number: '46',
                    country_id: 166,
                    latitude: null,
                    longitude: null,
                    valid_coordinates: null
                  }
              }
            ]
          } ]], 'myId', '1001');
    });
    res.json({});
});

module.exports = router;