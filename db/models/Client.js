const model = (sequelize, Sequelize)=>{
    const Client = sequelize.define('client', {
        name: Sequelize.STRING(1000),
        sync: Sequelize.BOOLEAN,
        slim_id: Sequelize.STRING,
        parser: Sequelize.STRING
    },{
        timestamps: false
    });

    return Client;
};

module.exports = model;