const routerUsers = require('express').Router();

const {
  getAllUsers, getUser, editUserInfo, editUserAvatar,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:_id', getUser);
routerUsers.patch('/me', editUserInfo);
routerUsers.patch('/me/avatar', editUserAvatar);

module.exports = {
  routerUsers,
};
