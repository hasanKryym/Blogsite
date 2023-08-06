const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorize = async (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization;
    const token = jwtToken && jwtToken.split(' ')[1];

    if (!token) {
      return res.status(403).json('Not Authorize');
    }

    const payload = jwt.verify(token, process.env.jwtSecret);

    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json('Not Authorize');
  }
};

module.exports = authorize;
