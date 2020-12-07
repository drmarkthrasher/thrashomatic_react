const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = require('../config');

module.exports = (token) => {
  // check if token was in the header
  if (!token || token == '') return [null, null, false];

  // check if valid token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return [null, null, false];
  }
  if (!decodedToken) return [null, null, false];

  const userId = decodedToken.userId;
  const email = decodedToken.email;
  const isAuth = true;
  return [userId, email, isAuth];
};
