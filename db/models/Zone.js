const model = (sequelize, Sequelize)=>{
    const Zone = sequelize.define('zip_zone', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        plangroup: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zip_code_list: Sequelize.ARRAY(Sequelize.TEXT),
    },{
        timestamps: false
    });

    return Zone;
};

module.exports = model;