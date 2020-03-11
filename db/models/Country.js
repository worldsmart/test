const model = (sequelize, Sequelize)=>{
    const Country = sequelize.define('country', {
        name: Sequelize.STRING,
        code: Sequelize.STRING
    },{
        timestamps: false
    });

    return Country;
};

module.exports = model;