const model = (sequelize, Sequelize)=>{
    const Customer = sequelize.define('customer', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slim_organisation_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        active: Sequelize.BOOLEAN
    },{
        timestamps: false
    });

    return Customer;
};

module.exports = model;