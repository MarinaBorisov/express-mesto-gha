const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers, getCurrentUser, getUser, editUserInfo, editUserAvatar,
} = require('../controllers/users');

const { linkValidator } = require('../validators/linkValidator');

Joi.objectId = require('joi-objectid')(Joi);

routerUsers.get('/', getAllUsers);
routerUsers.get('/me', getCurrentUser);
routerUsers.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.objectId(),
  }),
}), getUser);

routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editUserInfo);
routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(linkValidator),
  }),
}), editUserAvatar);

module.exports = {
  routerUsers,
};
