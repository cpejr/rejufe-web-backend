const express = require('express');
const UserRouter = express.Router();

const UserController = require('../../controllers/UsuarioController.jsx');
const UserValidator = require('../../validators/UsuarioValidator');

const { authenticateToken } = require('../../middlewares/authentication');

UserRouter.get(
  '/',
  UserController.getAll
);
UserRouter.get(
  '/:id',
  UserValidator.getById,
  UserController.getById
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

module.exports = UserRouter;
