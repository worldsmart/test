const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
let cronData = require('../src/cron');

router.get('/', (req, res)=>{
    let tmp = {};
    for(let key in global.cron){
        tmp[key] = {
            name: global.cron[key].name,
            action: global.cron[key].action,
            time: global.cron[key].time,
            hour: global.cron[key].hour
        }
    }
    res.json({timers: tmp});
});

router.put('/', (req, res)=>{
    if(!req.body.name){
        res.status(400).send('Name required');
        return;
    }
    if(global.cron[req.body.name]){
        res.status(400).send('Timer with such name already exists');
        return;
    }

    let cronTime = '';

    switch (req.body.time) {
        case 'Day':
            cronTime = '0 23 * * *';
            if(req.body.hour){
                cronTime = `0 ${req.body.hour - 1} * * *`;
            }
            break;
        case 'Hour':
            cronTime = '0 * * * *';
            break;
        case 'Minute':
            cronTime = '* * * * *';
            break;
        default:
            cronTime = '* * * * * *';
    }

    global.cron[req.body.name] = req.body;

    global.cron[req.body.name].cron = cron.schedule(cronTime, () => {
        console.log(req.body.name);
    });

    cronData[req.body.name] = {
        name: req.body.name,
        action: req.body.action,
        time: req.body.time,
        hour: req.body.hour,
        cron_time: cronTime,
        timestamp: new Date()
    };

    fs.writeFileSync(path.join(process.env.root, 'src', 'cron.json'), JSON.stringify(cronData, null, '\t'));

    res.json({timer: {
            name: req.body.name,
            action: req.body.action,
            time: req.body.time,
            hour: req.body.hour,
            timestamp: new Date()
        }});
});

router.delete('/', (req, res)=>{
    global.cron[req.query.name].cron.destroy();
    delete global.cron[req.query.name];
    delete cronData[req.query.name];
    fs.writeFileSync(path.join(process.env.root, 'src', 'cron.json'), JSON.stringify(cronData, null, '\t'));
    res.json({});
});

module.exports = router;