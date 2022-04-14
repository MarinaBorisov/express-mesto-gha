require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const NotFoundError = require('./errorModules/notFound');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { linkValidator } = require('./validators/linkValidator');

const ERROR_DEFAULT = 500;

const app = express();
const { PORT = 3000 } = process.env;

app.use(cookieParser());

const { routerCard } = require('./routes/cards');
const { routerUsers } = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(requestLogger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).custom(linkValidator),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/cards', auth, routerCard);
app.use('/users', auth, routerUsers);

app.use(errorLogger);

app.use(errors());

app.use('/', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;
  res.status(statusCode).send(
    { message: statusCode === ERROR_DEFAULT ? 'На сервере произошла ошибка' : message },
  );
  next();
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
});
