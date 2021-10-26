const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserMe,
} = require('../controllers/users');

// router.post('/', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required(),
//     password: Joi.string().required(),
//     name: Joi.string(),
//     about: Joi.string(),
//     avatar: Joi.string(),
//   }),
// }), createUser);

router.get('/', getUsers);

router.get('/me', getUserMe);

router.get('/:userId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().min(24).max(24).hex()
      .required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message('avatar - невалидный url');
    }),
  }),
}), updateAvatar);

module.exports = router;
