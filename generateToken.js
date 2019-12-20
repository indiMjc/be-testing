const secret = require('./jwtSecret');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    type: user.type
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = generateToken;