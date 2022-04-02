require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NotFoundError = require('./errorModules/notFound');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const ERROR_DEFAULT = 500;

const app = express();
const { PORT = 3000 } = process.env;

const { routerCard } = require('./routes/cards');
const { routerUsers } = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', routerCard);
app.use('/users', routerUsers);
app.use('/', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;
  res.status(statusCode).send(
    { message: statusCode === ERROR_DEFAULT ? 'На сервере произошла ошибка' : message },
  );
  next();
});

app.listen(PORT, () => {
});
