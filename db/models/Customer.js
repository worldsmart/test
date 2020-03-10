const model = (sequelize, Sequelize)=>{
    const Customer = sequelize.define('customer', {
        name: Sequelize.STRING,
        slim_organisation_id: Sequelize.STRING,
        active: Sequelize.BOOLEAN
    },{
        timestamps: false
    });

    return Customer;
};

module.exports = model;