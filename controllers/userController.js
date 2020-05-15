const userService = require('../services/userService');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    userService.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "E-Mail exists"
                });
            } else {
                bcrypt.hashSync(req.body.password, config.saltRounds, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            }).catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};

exports.login = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Authentication failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            emailId: user.emailId,
                        },
                    );
                    return res.status(200).json({
                        message: "Authentication successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Authentication failed"
                });
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};