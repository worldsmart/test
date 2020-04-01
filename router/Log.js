const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res, next)=>{
    res.json({
        ftp_parser: require('../src/middleware/log/ftp_parser'),
        push_to_slim: require('../src/middleware/log/push_to_slim'),
    });
});

module.exports = router;