const model = (sequelize, Sequelize)=>{
    const Zone = sequelize.define('zip_zone', {
        name: Sequelize.STRING,
        plangroup: Sequelize.STRING,
        zip_code_list: Sequelize.ARRAY(Sequelize.STRING),
    },{
        timestamps: false
    });

    return Zone;
};

module.exports = model;