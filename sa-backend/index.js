const express = require('express');
const db = require('./database');
const app = express();
const Order = require('./model/vaccineOrder');
const Vaccination = require ('./model/vaccination')
const makeId = require('./util/makeid');
const jsonUtil = require('./util/sourceUtils');
const inquirer  = require('./util/cliUtil');


//start express on port 3388
app.listen(3388 , () => {
    console.log(process.env.npm_package_name + ' : express started')
});
//sync db (Add {force: true} as a parameter for sync() for db reset)
db.sequelize.sync({force: true})
.then(() => {
    console.log(process.env.npm_package_name + '\
 : database init ok')
    run();
});

const run = async () => {
    inquirer.inquirer;

}

  