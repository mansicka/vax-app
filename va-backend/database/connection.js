const Sequelize = require('sequelize');

const sequelize = new Sequelize('vaxApp', 'root', 'root', { host: 'localhost', dialect: 'mysql', operatorAliases: false });

module.exports = sequelize;