const model = (sequelize, Sequelize)=>{
    const Ftp_settings = sequelize.define('ftp_settings', {
        name: Sequelize.STRING(1000),
        host:Sequelize.STRING(1000),
        port: Sequelize.INTEGER,
        user: Sequelize.STRING(1000),
        password: Sequelize.STRING(1000),
        done_path: Sequelize.STRING(1000),
        err_path: Sequelize.STRING(1000),
        data_path: Sequelize.STRING(1000),
        ssh_key: Sequelize.TEXT,
        use_sftp: Sequelize.BOOLEAN
    },{
        timestamps: false
    });

    return Ftp_settings;
};

module.exports = model;