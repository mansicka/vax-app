const express = require('express');
const db = require('./database');
const app = express();
const Order = require('./model/vaccineOrder');
const Vaccination = require ('./model/vaccination')
const makeId = require('./util/makeid');
const jsonPerser = require('./util/jsonPerser');
const vaccinationsSource = '.././source/vaccinations.source';

//start express on port 3388
app.listen(3388 , () => {
    console.log(process.env.npm_package_name + ' : express started')
});
//sync db (Add {force: true} as a parameter to sync() for db reset)
db.sequelize.sync({force: true}).then(() => console.log(process.env.npm_package_name + '\
 : database sync ok'));
var id = makeId.getNewId;
var arr = jsonPerser.vaccinations;
console.log(arr.length);
