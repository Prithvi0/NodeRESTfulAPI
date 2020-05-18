const user = require('../controllers/userController');
const express = require('express');
const router = express.Router();

/** routes to forward HTTP methods to controller */
// create a new user
router.post('/registration', user.register);

// retrieve user
router.post('/login', user.login);

module.exports = router;