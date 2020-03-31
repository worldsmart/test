const model = (sequelize, Sequelize)=>{
    const Country = sequelize.define('country', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    });

    return Country;
};

module.exports = model;