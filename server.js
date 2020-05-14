const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./config/databaseConfig');
const mongoose = require('mongoose');

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// route definition
app.get('/', (request, response) => {
    response.json({'message': 'Welcome User!'})
});

// listen for requests
app.listen(3001, () => {
    console.log('Server is listening on port 3001')
});