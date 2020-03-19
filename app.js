const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/index');
const jwt = require('jsonwebtoken');
const user = require('./hardcode');
const fileUpload = require('express-fileupload');

let app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(fileUpload());

process.env.root = __dirname;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

/*process.on('unhandledRejection', error => {

});*/

app.use((req, res, next)=>{
    if(req.url === '/api/login'){
        next();
    }else if(!req.headers.authorization){
        res.status(401).send('Authorization header required');
    }else {
        let decoded = jwt.verify(req.headers.authorization, 'secret');
        let candidate = decoded.data;
        if(candidate.login === user.login && candidate.password === user.password){
            next()
        }else {
            res.status(401).send('Unauthorized. Wrong username or password.');
        }
    }
});

app.use('/api', router);

/*app.get('/test', (req, res)=>{
   db.Customer.findAll({include: [{
         model: db.Client,
         include: [{
            model: db.Zone
         },{
            model: db.Ftp_settings
         },{
             model: db.Order,
             include: [{
                 model: db.Activity,
                 include: [{
                     model: db.Address,
                     include: [{
                         model: db.Country
                     }]
                 }]
             }]
         }]
      }]}).then((customers)=>{
         res.json(customers);
      });
});*/

app.listen(port, ()=>{
   console.log('Server started on port: ' + port);
});