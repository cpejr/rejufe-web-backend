const express = require('express');
const UserRouter = express.Router();

const UserController = require('../../controllers/UsuarioController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

UserRouter.get(
  '/',
  UserController.getAll
);
UserRouter.get(
  '/:id',
  UserController.getById
);
UserRouter.post(
  '/',
  UserController.create
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
