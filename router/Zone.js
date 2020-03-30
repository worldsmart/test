const express = require('express');
const router = express.Router();
const { Zone } = require('../db/index');

router.put('/', (req, res, next)=>{
    let data = req.body;
    if(data.name && data.plangroup && data.zip_code_list[0]){
        Zone.create(data).then((zone)=>{
            if(!zone){
                res.json({err:'err'});
                return;
            }
            res.json({zone:zone});
        });
    }else{
        res.status(400).send('Fields [name, plangroup, zip code[0]] are requered');
    }
});

router.delete('/', (req, res, next)=>{
    if(req.query.id){
        Zone.destroy({
            where: {
                id: req.query.id
            }
        }).then(r=>{
            if(!r){
                res.status(400).send('No zone with such Id');
                return;
            }
            res.json({});
        });
    }else{
        res.status(400).send('Qery param [id] requered');
    }
});

module.exports = router;