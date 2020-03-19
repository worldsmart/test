const model = (sequelize, Sequelize)=>{
    const Order = sequelize.define('order', {
        name: Sequelize.STRING(1000),
        debtorNr: Sequelize.STRING(1000),
        date: Sequelize.DATE,
        units: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        volume: Sequelize.FLOAT,
        load_meters: Sequelize.FLOAT,
        description: Sequelize.STRING(1000),
        order_type: Sequelize.STRING(1000),
        transport_type: Sequelize.STRING(1000),
        plangroup: Sequelize.STRING(1000),
        cargo: Sequelize.STRING(1000),
        reuse_address: Sequelize.BOOLEAN,
        source: Sequelize.STRING(1000),
        additional: Sequelize.ARRAY(Sequelize.STRING(1000))
    },{
        timestamps: false
    });
 
    return Order;
};

module.exports = model;