module.exports = (sequelize, DataTypes) => {
    const VaccinationOrder = sequelize.define("orders", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        gender: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        }
    });
  
    return VaccinationOrder;
  };

