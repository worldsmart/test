const model = (sequelize, Sequelize)=>{
    const Ftp_settings = sequelize.define('ftp_settings', {
        name: Sequelize.STRING,
        host:Sequelize.STRING,
        port: Sequelize.INTEGER,
        user: Sequelize.STRING,
        password: Sequelize.STRING
    },{
        timestamps: false
    });

    return Ftp_settings;
};

module.exports = model;