const userValidator = require('express-validator');

module.exports = class UserValidations {
    user() {
        return [
            userValidator('userName', 'minimum 3 characters required').isLength({ min: 3 }),
            userValidator('emailId', 'valid email required').isEmail(),
            userValidator('password', 'valid password required').isLength({ min: 8 })
        ];
    }

    emailValidation() {
        return [/^[a-zA-Z]+([+-_.][a-zA-Z0-9])*[0-9]*\@[a-z0-9]+[.]([a-z]{2,4}[.])?[a-z]{2,4}$/, 'email invalid']
    }
}