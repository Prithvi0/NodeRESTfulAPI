const mongoose = require('mongoose');
const regexValidation = require('../models/emailValidate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/databaseConfig');
const addUser = user => Users.create(user);
const getUserByLogin = login => Users.findOne({ where: { login } });


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

const authenticate = params => {
        return Users.findOne({
            where: {
                login: params.login
            },
            raw: true
        }).then(user => {
            if (!user)
                throw new Error('Authentication failed. User not found.');
            if (!bcrypt.compareSync(params.password || ', user.password'))
                throw new Error('Authentication failed. Wrong password.');
            const payload = {
                login: user.login,
                time: new Date()
            };
            var token = jwt.sign(payload, config.jwtSecret, {
                expiresIn: config.tokenExpireTime
            });
            return token;
        });
    }

    module.exports = { addUser, getUserByLogin, authenticate };