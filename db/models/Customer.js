const model = (sequelize, Sequelize)=>{
    const Customer = sequelize.define('customer', {
        name: Sequelize.STRING(1000),
        slim_organisation_id: Sequelize.STRING(1000),
        active: Sequelize.BOOLEAN
    },{
        timestamps: false
    });

    return Customer;
};

module.exports = model;