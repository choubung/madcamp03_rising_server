// services/userService.js

const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerUser = (userData, callback) => {
  // 비밀번호 해싱
  bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    const newUser = {
      ...userData,
      password: hashedPassword
    };

    userModel.createUser(newUser, callback);
  });
};

const loginUser = (username, password, callback) => {
  userModel.findUserByUsername(username, (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, false);

    const user = results[0];
    
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return callback(err);
      if (!isMatch) return callback(null, false);

      return callback(null, user);
    });
  });
};

module.exports = {
  registerUser,
  loginUser
};