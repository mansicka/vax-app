
module.exports = (sequelize, DataTypes) => {
    const Order = require('./order')
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
        }
    });
    return Vaccination;
};