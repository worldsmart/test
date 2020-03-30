const express = require('express');
const router = express.Router();
const { Ftp_settings } = require('../db/index');

router.put('/', (req, res, next)=>{
    let data = req.body;
    Ftp_settings.update(data, {
        where: {
            id: data.id
        }
    }).then((ftp)=>{
        res.json({ftp:ftp});
    }).catch(e=>{
        res.status(500).send('Db err: ' + e);
    });
});

module.exports = router;