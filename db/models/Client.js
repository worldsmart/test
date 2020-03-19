const model = (sequelize, Sequelize)=>{
    const Client = sequelize.define('client', {
        name: Sequelize.STRING(1000),
        sync: Sequelize.BOOLEAN
    },{
        timestamps: false
    });

    return Client;
};

module.exports = model;