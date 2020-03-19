const model = (sequelize, Sequelize)=>{
    const Activity = sequelize.define('activity', {
        type: Sequelize.STRING(1000),
        name: Sequelize.STRING(1000),
        phone: Sequelize.STRING(1000),
        contact_person: Sequelize.STRING(1000),
        remarks: Sequelize.STRING(1000),
        date: Sequelize.DATE,
        time_from: Sequelize.STRING(1000),
        time_till: Sequelize.STRING(1000),
        sequence: Sequelize.INTEGER
    },{
        timestamps: false
    });

    return Activity;
};

module.exports = model;