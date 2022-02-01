const express = require('express');
const UserRouter = express.Router();

const UserController = require('../../controllers/UsuarioController.jsx');
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
UserRouter.get(
  '/:id',
  UserValidator.getById,
  authenticateToken,
  UserController.getById
);
UserRouter.post(
  '/',
  UserValidator.create,
  authenticateToken,
  UserController.create
);
UserRouter.put(
  '/:id',
  UserValidator.update,
  authenticateToken,
  UserController.update
);
UserRouter.delete(
  '/:id',
  UserValidator.delete,
  authenticateToken,
  UserController.delete
);

module.exports = UserRouter;
