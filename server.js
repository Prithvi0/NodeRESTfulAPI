const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route definition
app.get('/', (request, response) => {
    response.json({'message': 'Welcome User!'})
});

// listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000')
});