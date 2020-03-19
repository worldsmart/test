const model = (sequelize, Sequelize)=>{
    const Address = sequelize.define('address', {
        street: Sequelize.STRING(1000),
        house_number: Sequelize.STRING(1000),
        zip_code: Sequelize.STRING(1000),
        city: Sequelize.STRING(1000),
        latitude: Sequelize.FLOAT,
        longitude: Sequelize.FLOAT,
        valid_coordinates: Sequelize.BOOLEAN
    },{
        timestamps: false
    });

    return Address;
};

module.exports = model;