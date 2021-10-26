const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, cardAddLike, deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message('link - невалидный url');
    }),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().min(24).max(24).hex()
      .required(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().min(24).max(24).hex()
      .required(),
  }),
}), cardAddLike);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().min(24).max(24).hex()
      .required(),
  }),
}), deleteCardLike);

module.exports = router;
