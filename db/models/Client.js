const model = (sequelize, Sequelize)=>{
    const Client = sequelize.define('client', {
        name: Sequelize.STRING,
        Sync: Sequelize.BOOLEAN
    },{
        timestamps: false
    });

    return Client;
};

module.exports = model;