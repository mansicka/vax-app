const express = require('express');
const db = require('./models/database');
const app = express();
const cors = require("cors");

//Sync db (Add {force: true} as a parameter for sync() for db reset)
// Be sure to import dummy data using importSources.js before running this :D



var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "OK" });
});

require("./routes/routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('server is running on port ' + PORT);
});