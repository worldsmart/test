const model = (sequelize, Sequelize)=>{
    const Address = sequelize.define('address', {
        street: Sequelize.STRING,
        house_number: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        city: Sequelize.STRING,
        latitude: Sequelize.FLOAT,
        longitude: Sequelize.FLOAT,
        valid_coordinates: Sequelize.BOOLEAN
    },{
        timestamps: false
    });

    return Address;
};

module.exports = model;