const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

const { routerCard } = require('./routes/cards');
const { routerUsers } = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62377f981940d76b1e3029a9',
  };
  next();
});

app.use('/cards', routerCard);

app.use('/users', routerUsers);
app.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => {
});
