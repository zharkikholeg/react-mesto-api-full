const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    default: 'Жак-Ив Кусто',
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String, // имя — это строка
    default: 'Исследователь',
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  avatar: {
    type: String, // имя — это строка
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(val) {
        return val.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      },
      message: 'Введите валидный url',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(val) {
        return validator.isEmail(val);
      },
      message: 'Введите валидный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
// module.exports = userSchema;
