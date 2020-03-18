const model = (sequelize, Sequelize)=>{
    const Order = sequelize.define('order', {
        status: Sequelize.STRING,
        name: Sequelize.STRING,
        debtorNr: Sequelize.STRING,//
        date: Sequelize.DATE,
        units: Sequelize.INTEGER,//
        weight: Sequelize.FLOAT,
        volume: Sequelize.FLOAT,
        load_meters: Sequelize.FLOAT,
        description: Sequelize.STRING,
        order_type: Sequelize.STRING,//
        transport_type: Sequelize.STRING,//
        plangroup: Sequelize.STRING,//
        cargo: Sequelize.STRING,
        reuse_address: Sequelize.BOOLEAN,
        source: Sequelize.STRING,
    },{
        timestamps: false
    });

    return Order;
};

module.exports = model;