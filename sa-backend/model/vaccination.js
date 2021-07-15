module.exports = (sequelize, DataTypes) => {
    const Vaccination = sequelize.define("vaccination", {
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
  
    return Vaccination;
  };

