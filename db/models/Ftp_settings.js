const model = (sequelize, Sequelize)=>{
    const Ftp_settings = sequelize.define('ftp_settings', {
        name: Sequelize.STRING(1000),
        host:Sequelize.STRING(1000),
        port: Sequelize.INTEGER,
        user: Sequelize.STRING(1000),
        password: Sequelize.STRING(1000)
    },{
        timestamps: false
    });

    return Ftp_settings;
};

module.exports = model;