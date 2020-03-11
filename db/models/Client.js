const model = (sequelize, Sequelize)=>{
    const Client = sequelize.define('client', {
        name: Sequelize.STRING,
        sync: Sequelize.BOOLEAN
    },{
        timestamps: false
    });

    return Client;
};

module.exports = model;