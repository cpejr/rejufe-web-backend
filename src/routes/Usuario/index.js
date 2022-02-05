const express = require('express');
const UserRouter = express.Router();

const UserController = require('../../controllers/UsuarioController.jsx');
const UserValidator = require('../../validators/UsuarioValidator');

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

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
  requiresLogin,
  UserController.getById
);
UserRouter.post(
  '/',
  UserValidator.create,
  requiresLogin,
  UserController.create
);
UserRouter.put(
  '/:id',
  UserValidator.update,
  requiresLogin,
  UserController.update
);
UserRouter.delete(
  '/:id',
  UserValidator.delete,
  requiresLogin,
  UserController.delete
);

module.exports = UserRouter;
