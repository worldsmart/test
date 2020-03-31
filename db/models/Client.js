const model = (sequelize, Sequelize)=>{
    const Client = sequelize.define('client', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sync: Sequelize.BOOLEAN,
        slim_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        parser: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    });

    return Client;
};

module.exports = model;