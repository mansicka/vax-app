//init sequelize
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config')


const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  query: { raw: true }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vaccinations = require('./vaccination')(sequelize, Sequelize);
db.orders = require('./vaccineOrder')(sequelize, Sequelize);

module.exports = db;