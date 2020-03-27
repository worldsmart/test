const express = require('express');
const router = express.Router();
const parser = require('../src/middleware/parser/default');
const fs = require('fs');
const path = require('path');
const ftp_parser = require('../src/middleware/ftp_parser');
const axios = require('axios');

router.get('/', async (req, res)=>{
    
    ftp_parser();
    res.json({});
});

module.exports = router;