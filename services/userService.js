const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../app/models/userModel');
const config = require('../config/databaseConfig');
const addUser = user => Users.create(user);
const getUserByLogin = login => Users.findOne({ where: { login } });

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