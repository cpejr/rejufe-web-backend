const express = require('express');
const UserRouter = express.Router();

const UserController = require('../../controllers/UsuarioController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

UserRouter.get(
  '/',
  UserController.index
);
UserRouter.get(
  '/:id',
  UserController.detail
);
UserRouter.post(
  '/',
  UserController.store
);
UserRouter.put(
  '/:id',
  UserController.update
);
UserRouter.delete(
  '/:id',
  UserController.delete
);

module.exports = UserRouter
