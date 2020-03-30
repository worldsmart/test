const express = require('express');
const router = express.Router();
const user = require('../hardcode');
const jwt = require('jsonwebtoken');

router.put('/', (req, res, next)=>{
    let data = req.body;
    if(!data.login || !data.password){
        res.status(400).send('Fields [username, password] required');
        return;
    }
    if(data.login === user.login && data.password === user.password){
        let token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),// 7 days token
            data: {
                login: data.login,
                password: data.password
            }
        }, 'secret');
        res.json({jwt: token, user: user.name, login: user.login});
    }else {
        res.status(401).send('Unauthorized. Wrong username or password.');
    }
});

router.get('/', (req, res, next)=>{
    if(!req.headers.authorization){
        res.status(401).send('Authorization header required');
    }else {
        let decoded = jwt.verify(req.headers.authorization, 'secret');
        if(decoded.data.login === user.login && decoded.data.password === user.password){
            res.json({user: user.name, login: user.login});
        }else {
            res.status(401).send('Unauthorized. Wrong username or password.');
        }
    }
});

module.exports = router;