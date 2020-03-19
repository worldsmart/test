const model = (sequelize, Sequelize)=>{
    const Zone = sequelize.define('zip_zone', {
        name: Sequelize.TEXT,
        plangroup: Sequelize.TEXT,
        zip_code_list: Sequelize.ARRAY(Sequelize.TEXT),
    },{
        timestamps: false
    });

    return Zone;
};

module.exports = model;