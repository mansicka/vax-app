module.exports = (sequelize, DataTypes) => {
    const VaccinationOrder = sequelize.define("order", {
        order_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        order_number: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        responsible_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vaccine_brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        injections: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        injections_left: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        arrival_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    return VaccinationOrder;
};

