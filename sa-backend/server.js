const express = require('express');
const app = express();
const db = require('./models')
const routes = require('./routes');
const PORT = process.env.PORT || 8080;
var Vaccination = db.Vaccination;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

db.sequelize.sync().then(async () => {
    const result = await Vaccination.findAll();
    if (result.length == 0) {
        console.error('\x1b[31m%s\x1b[33m', '\n Database is empty. Run seeders to populate. Exiting.');
        process.exit();
    } else {
        app.listen(PORT, () => {
            console.log('\n Express running on port ' + PORT + ': http://localhost:8080');
        });
    }


});