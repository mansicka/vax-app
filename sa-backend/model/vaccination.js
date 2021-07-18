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
            type: DataTypes.STRING,
            allowNull: false
        }
       
    });
  
    return Vaccination;
  }