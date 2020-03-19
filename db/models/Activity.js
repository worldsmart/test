const model = (sequelize, Sequelize)=>{
    const Activity = sequelize.define('activity', {
        type: Sequelize.STRING,
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        contact_person: Sequelize.STRING,
        remarks: Sequelize.STRING,
        date: Sequelize.DATE,
        time_from: Sequelize.STRING,
        time_till: Sequelize.STRING,
        sequence: Sequelize.INTEGER
    },{
        timestamps: false
    });

    return Activity;
};

module.exports = model;