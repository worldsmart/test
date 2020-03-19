const express = require('express');
const router = express.Router();
const { Zone } = require('../db/index');

router.put('/', (req, res, next)=>{
    console.log('Data captured', req.body);
    let data = req.body;
    Zone.create(data).then((zone)=>{
        if(!zone){
            res.json({err:'err'});
            return;
        }
        res.json({zone:zone});
    });
});

module.exports = router;