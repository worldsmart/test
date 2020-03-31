const model = (sequelize, Sequelize)=>{
    const Ftp_files = sequelize.define('ftp_files', {
        local_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        original_name:{
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    });

    return Ftp_files;
};

module.exports = model;