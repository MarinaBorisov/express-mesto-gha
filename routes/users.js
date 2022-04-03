const routerUsers = require('express').Router();

const {
  getAllUsers, getUser, createUser, editUserInfo, editUserAvatar,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:_id', getUser);
routerUsers.post('/', createUser);
routerUsers.patch('/me', editUserInfo);
routerUsers.patch('/me/avatar', editUserAvatar);

module.exports = {
  routerUsers,
};
