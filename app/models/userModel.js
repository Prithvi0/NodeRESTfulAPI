const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z][\w]{2,14}$/
    },
    emailId: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z]+([+-_.][a-zA-Z0-9])*[0-9]*\@[a-z0-9]+[.]([a-z]{2,4}[.])?[a-z]{2,4}$/
        },
    password: {
            type: String,
            required: true,
            match: /^.{8,20}/
        },
    },
        {
            timeStamps: true
        }
);

module.exports = mongoose.model('User', userSchema);