//init sequelize
const { Sequelize } = require('sequelize');
const dbConfig = require('./config/db.config')


const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
  });

const db =  {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vaccinations = require('./model/vaccination')(sequelize, Sequelize);
db.orders = require('./model/vaccineOrder')(sequelize, Sequelize);

db.orders.hasMany(db.vaccinations, {as: 'vaccinations'});
db.vaccinations.belongsTo(db.orders, {
  foreignKey: 'order_id',
  as: 'origin_bottle',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION'
});
  module.exports = db;