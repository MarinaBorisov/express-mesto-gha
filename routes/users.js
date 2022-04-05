const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers, getCurrentUser, getUser, createUser, editUserInfo, editUserAvatar,
} = require('../controllers/users');

const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

Joi.objectId = require('joi-objectid')(Joi);

routerUsers.get('/', getAllUsers);
routerUsers.get('/me', getCurrentUser);
routerUsers.get('/:_id', celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
}), getUser);
routerUsers.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(regexp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editUserInfo);
routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexp),
  }),
}), editUserAvatar);

module.exports = {
  routerUsers,
};
