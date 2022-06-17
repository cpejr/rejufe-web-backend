const express = require('express');
const UserRouter = express.Router();

const UserController = require('../../controllers/UsuarioController.js');
const UserValidator = require('../../validators/UsuarioValidator');

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

UserRouter.get(
  '/getUsersByTodaysBirthday',
  UserController.getUsersByTodaysBirthday
);
UserRouter.get(
  '/getUserEmailByUsername',
  UserValidator.getUserEmailByUsername,
  UserController.getUserEmailByUsername
);
UserRouter.get(
  '/getExcludedAssociate',
  UserValidator.getExcludedAssociate,
  checksUserIsAdmin,
  UserController.getExcludedAssociate,
);
UserRouter.get(
  '/',
  UserValidator.getAll,
  checksUserIsAdmin,
  UserController.getAll
);
UserRouter.get(
  '/section/:section',
  UserValidator.getBySection,
  checksUserIsAdmin,
  UserController.getUsersBySection,
);
UserRouter.get(
  '/externalAssociate',
  UserValidator.getExternalAssociates,
  checksUserIsAdmin,
  UserController.getExternalAssociates
);
UserRouter.get(
  '/:id',
  UserValidator.getById,
  requiresLogin,
  UserController.getById
);
UserRouter.get(
  '/externalAssociate/:id',
  UserValidator.getExternalUserById,
  requiresLogin,
  UserController.getExternalUserById
);
UserRouter.post(
  '/',
  UserValidator.create,
  checksUserIsAdmin,
  UserController.create
);
UserRouter.post(
  '/externalAssociateRegister',
  UserValidator.createExternalAssociate,
  UserController.createExternalAssociate
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
  checksUserIsAdmin,
  UserController.delete
);
UserRouter.delete(
  '/externalAssociate/:id',
  UserValidator.deleteExternalAssociate,
  checksUserIsAdmin,
  UserController.deleteExternalAssociate
);

module.exports = UserRouter;
