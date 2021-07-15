const express = require('express');
const mysql = require('mysql');


//Create connection
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '9oogS2GKJ&',
    database: 'vax_app_db'
});

// Connect to vax_app_db
db.connect((err) => {if(err) throw err;});

const app = express();
