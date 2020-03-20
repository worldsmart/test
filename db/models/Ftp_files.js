const model = (sequelize, Sequelize)=>{
    const Ftp_files = sequelize.define('ftp_files', {
        local_name: Sequelize.STRING(1000),
        original_name:Sequelize.STRING(1000)
    },{
        timestamps: false
    });

    return Ftp_files;
};

module.exports = model;