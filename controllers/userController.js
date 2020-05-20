/** It passes request to login & register microservices & get response
 * @param {httpRequest} req
 * @param {httpresponse} res
 * @param {callbackfunction} callback
 */

const userService = require('../services/userService');

exports.register = (req, res) => {
  userService.find({ 'emailId': req.body.emailId })
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
              'userName': req.body.userName,
              'emailId': req.body.emailId,
              'password': hash
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
  User.find({ 'emailId': req.body.emailId })
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
              'emailId': user.emailId,
              'password': user.password
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