const express = require('express');
const router = express.Router();

const customer = require('./Customer');
const client = require('./Client');
const zone = require('./Zone');
const login = require('./Login');
const ftp = require('./Ftp');
const order = require('./Order');
const timer = require('./Timer');

router.use('/customer', customer);
router.use('/client', client);
router.use('/zone', zone);
router.use('/login', login);
router.use('/ftp', ftp);
router.use('/order', order);
router.use('/timer', timer);

module.exports = router;