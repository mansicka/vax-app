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
db.connect((err) => {
    if(err) throw err;
    console.log('db connection established');
    let sql = 'CREATE TABLE IF NOT EXISTS vaccine_orders \
    bottle_id VARCHAR PRIMARY KEY \
    order_id INT NOT NULL \
    responsible_person VARCHAR NOT NULL \
    district VARCHAR NOT NULL \
    vaccine_brand VARCHAR NOT NULL \
    injections INT NOT NULL \
    arrival_date VARCHAR NOT NULL';
    db.query(sql, function (err, result) {
        if (err) throw err;
        else console.log(result);
    });

    
});

const app = express();
