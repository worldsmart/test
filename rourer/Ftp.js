const express = require('express');
const router = express.Router();
const { Ftp_settings } = require('../db/index');

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

module.exports = router;