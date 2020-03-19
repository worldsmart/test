const model = (sequelize, Sequelize)=>{
    const Country = sequelize.define('country', {
        name: Sequelize.STRING(1000),
        code: Sequelize.STRING(1000)
    },{
        timestamps: false
    });

    return Country;
};

module.exports = model;