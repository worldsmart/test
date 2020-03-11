const express = require('express');
const db = require('./db/index');

let app = express();
const port = 8080;

app.get('/test', (req, res)=>{
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
});

app.listen(port, ()=>{
   console.log('Server started on port: ' + port);
});