const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

var sequelize = new Sequelize('pg', 'postgres', '1', {
    host: 'localhost',
    dialect: 'postgres',
    retry: {
        max: 8
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false
});

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

let models = {};

fs.readdirSync(path.join(__dirname, 'models')).forEach((file)=>{
    file = file.substring(0, file.indexOf('.'));
    models[file] = require('./models/' + file)(sequelize, Sequelize);
});

models.Client.hasMany(models.Zone, {foreignKey: 'client_id'});
models.Customer.hasMany(models.Client, {foreignKey: 'customer_id'});
models.Client.hasOne(models.Ftp_settings, {foreignKey: 'client_id'});

models.Ftp_settings.belongsTo(models.Client, {foreignKey: 'client_id'});
models.Client.belongsTo(models.Customer, {foreignKey: 'customer_id'});
models.Zone.belongsTo(models.Client, {foreignKey: 'client_id'});

sync();

async function sync(){
    await models.Ftp_settings.sync({force:true});
    await models.Client.sync({force:true});
    await models.Customer.sync({force:true});
    await models.Zone.sync({force:true});
}

module.exports = models;