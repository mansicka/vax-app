const express = require('express');
const db = require('./database');
const app = express();
const Order = require('./model/vaccineOrder');
const Vaccination = require ('./model/vaccination')

//start express on port 3388
app.listen(3388 , () => {
    console.log(process.env.npm_package_name + ' : express started')
});
//sync db (Add {force: true} as a parameter to sync() for db reset)
db.sequelize.sync({force: true}).then(() => console.log(process.env.npm_package_name + '\
 : database sync ok'));
