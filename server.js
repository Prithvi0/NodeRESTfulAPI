const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const port = process.env.PORT || 7001;
const server = http.createServer(app);
const dotenv = require('dotenv');
dotenv.config();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route definition
app.get('/', (request, response) => {
    response.json({'message': 'Welcome User!'});
});

// listen for requests
server.listen(port, err => {
    if (err)
        throw new Error(err);
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;