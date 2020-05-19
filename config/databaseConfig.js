const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// connecting to the database
module.exports = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

module.exports = {
    saltRounds: 2,
    jwtSecret: 'yo-its-a-secret',
    tokenExpireTime: '6h',
}