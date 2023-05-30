const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new UnauthorizedError('Необходима авторизация'));
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = authMiddleware;
