const jwt = require('jsonwebtoken');

exports.generateToken = (id, expiresIn) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn || process.env.JWT_EXPIRE,
  });
