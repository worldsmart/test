const parser = require('xml2js');
const path = require('path');
const fs = require('fs');



/*const express = require('express');

let app = express();

app.get('/parse', (req, res)=>{
    let filedata = fs.readFileSync(path.join(__dirname, 'ex.xml'), 'utf8');

    parser.parseString(filedata, function (err, result) {
        res.json(result);
    });
});

app.listen(8081, ()=>{
   console.log('Server started');
});*/
