module.exports = app => {
    const user = require('../controllers/userController');

    // create a new user
    app.post('/registration', user.register);

    // retrieve user
    app.get('/login', user.login);
}