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

//relations of models
models.Client.hasMany(models.Zone, {foreignKey: 'client_id'});
models.Client.hasOne(models.Ftp_settings, {foreignKey: 'client_id'});
models.Client.belongsTo(models.Customer, {foreignKey: 'customer_id'});
models.Client.hasMany(models.Order, {foreignKey: 'customer_code'});

models.Customer.hasMany(models.Client, {foreignKey: 'customer_id'});

models.Ftp_settings.belongsTo(models.Client, {foreignKey: 'client_id'});

models.Zone.belongsTo(models.Client, {foreignKey: 'client_id'});

models.Country.hasMany(models.Address, {foreignKey: 'country_id'});

models.Address.belongsTo(models.Country, {foreignKey: 'country_id'});
models.Address.hasOne(models.Activity, {foreignKey: 'address_id'});

models.Activity.belongsTo(models.Address, {foreignKey: 'address_id'});
models.Activity.belongsTo(models.Order, {foreignKey: 'shipment_id'});

models.Order.hasMany(models.Activity, {foreignKey: 'shipment_id'});
models.Order.belongsTo(models.Client, {foreignKey: 'customer_code'});

module.exports = models;