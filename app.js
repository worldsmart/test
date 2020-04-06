const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/index');
const jwt = require('jsonwebtoken');
const user = require('./hardcode');
const fileUpload = require('express-fileupload');
const cronData = require('./src/cron');
const cron = require('node-cron');
const cronExecutor = require('./src/middleware/cronExecutor');

let app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(fileUpload());

//cron event restore
if(!global.cron){
    global.cron = {};
    for(let key in cronData){
        global.cron[key] = {
            name: cronData[key].name,
            action: cronData[key].action,
            time: cronData[key].time,
            hour: cronData[key].hour,
            timestamp: cronData[key].timestamp,
        };
        global.cron[key].cron = cron.schedule(cronData[key].cron_time, () => {
            cronExecutor(cronData[key].action);
        });
        console.log('Cron with name "' + cronData[key].name + '" was restored')
    }
}

process.env.root = __dirname;

//disable cert validation rejection for self signed FTP cert
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//authorization middleware
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

//REST rout
app.use('/api', router);

app.listen(port, ()=>{
   console.log('Server started on port: ' + port);
});