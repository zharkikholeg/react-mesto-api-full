const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  console.log(req.body);
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const err = new Error('Переданы некорректные данные при создании карточки');
        err.statusCode = 400;
        return next(err);
      }
      const err2 = new Error('На сервере произошла ошибка');
      err2.statusCode = 500;
      return next(err2);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  // Здесь написать валидацию того, что карта принадлежит юзеру, отправивдему запрос
  const reqId = req.user._id;

  Card.findById({
    _id: req.params.cardId,
    owner: reqId,
  })
    .then((card) => {
      if (!card) {
        const err = new Error('Карточка с указанным _id не найдена');
        err.statusCode = 404;
        return next(err);
      }
      if (card.owner === reqId) {
        Card.findOneAndRemove({
          _id: req.params.cardId,
          owner: reqId,
        })
          .then((cardResult) => {
            res.send(cardResult);
          });
      } else {
        const err = new Error('Вы не являетесь владельцем этой карточки');
        err.statusCode = 403;
        return next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // return res.status(400).send({ message: 'Карточка с указанным _id не найдена' });
        const err = new Error('Карточка с указанным _id не найдена');
        err.statusCode = 404;
        return next(err);
      }
      if (err.name === 'NotFound') {
        const err = new Error('Карточка с указанным _id не найдена');
        err.statusCode = 404;
        return next(err);
      }
      const err2 = new Error('На сервере произошла ошибка');
      err2.statusCode = 500;
      return next(err2);
    })
    .catch(next);
};

module.exports.cardAddLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        const err = new Error('Карточка с указанным _id не найдена');
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const err = new Error('Переданы некорректные данные для постановки лайка');
        err.statusCode = 400;
        return next(err);
      }
      if (err.name === 'NotFound') {
        const err = new Error('Карточка с указанным _id не найдена');
        err.statusCode = 404;
        return next(err);
      }
      const err2 = new Error('На сервере произошла ошибка');
      err2.statusCode = 500;
      return next(err2);
    })
    .catch(next);
};

module.exports.deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        const err = new Error('Карточка с указанным _id не найдена');
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const err = new Error('Переданы некорректные данные для постановки лайка');
        err.statusCode = 400;
        return next(err);
      }
      if (err.name === 'NotFound') {
        const err = new Error('Карточка с указанным _id не найдена');
        err.statusCode = 404;
        return next(err);
      }
      const err2 = new Error('На сервере произошла ошибка');
      err2.statusCode = 500;
      return next(err2);
    })
    .catch(next);
};
