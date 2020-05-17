const user = require('../controllers/userController');
const express = require('express');
const router = express.Router();

// create a new user
router.post('/registration', user.register);

// retrieve user
router.get('/login', user.login);

module.exports = router;