const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const urlPattern = require('../utils/constants');

const {
  getUsers,
  getUserById,
  createUser,
  editProfile,
  editAvatar,
  login,
  getUser,
} = require('../controllers/users');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlPattern),
    }),
  }),
  createUser,
);

router.get('/users/me', auth, getUser);
router.get('/users', auth, getUsers);

router.get(
  '/users/:userId',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

router.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  editProfile,
);

router.patch(
  '/users/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlPattern),
    }),
  }),
  editAvatar,
);

module.exports = router;
