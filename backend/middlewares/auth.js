const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new UnauthorizedError('Необходима авторизация'));
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'dev-secret' : JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = authMiddleware;
