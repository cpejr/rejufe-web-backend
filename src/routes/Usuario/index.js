const express = require('express');
const UserRouter = express.Router();

const UserController = require('../../controllers/UsuarioController.js');
const UserValidator = require('../../validators/UsuarioValidator');

const { authenticateToken } = require('../../middlewares/authentication');

UserRouter.get(
  '/getUserEmailByUsername',
  UserValidator.getUserEmailByUsername,
  UserController.getUserEmailByUsername
);
UserRouter.get(
  '/',
  UserValidator.getAll,
  UserController.getAll
);


UserRouter.post(
  '/',
  UserValidator.create,
  UserController.create
);
UserRouter.put(
  '/:id',
  UserValidator.update,
  UserController.update
);
UserRouter.delete(
  '/:id',
  UserValidator.delete,
  UserController.delete
);
UserRouter.get(
  '/:id',
  UserValidator.getById,
  UserController.getById
);

module.exports = UserRouter;
