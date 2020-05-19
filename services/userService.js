/**
 * @params {object} data
 * @params {callback function} callback
 */

const Users = require('../app/models/userModel');

exports.register = (data, callback) => {
  Users.register(data, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

exports.login = (data, callback) => {
    Users.login(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}