const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req.headers);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;

    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;

    next(err);
  }

  req.user = payload;

  next();
};
