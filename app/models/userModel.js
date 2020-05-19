const mongoose = require('mongoose');
const regexValidation = require('../models/emailValidate');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'user name required'],
        unique: true,
        min: 3,
        max: 15
    },
    emailId: {
            type: String,
            required: [true, 'email required'],
            unique: true,
            match: regexValidation.emailValidate(),
        },
    password: {
            type: String,
            required: [true, 'password required'],
            min: 8,
            max: 20
        },
    },
        {
            timeStamps: true
        }
);

module.exports = mongoose.model('User', userSchema);