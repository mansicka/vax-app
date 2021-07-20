module.exports = (sequelize, DataTypes) => {
    const Vaccination = sequelize.define("vaccination", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.Sequelize.DATE,
            allowNull: false
        },
        origin_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Vaccination;
}