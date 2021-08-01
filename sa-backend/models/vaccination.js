const VaccinationOrder = require('./order')
module.exports = (sequelize, DataTypes) => {
    const Vaccination = sequelize.define("Vaccination", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE(6),
            allowNull: false
        },
        origin_id: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Vaccination;
};