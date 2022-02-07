const express = require('express');
const AccountabilityRouter = express.Router();

const AccountabilityController = require('../../controllers/PrestacaoDeContasController.js');
const AccountabilityValidator = require('../../validators/PrestacaoDeContasValidator');

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

AccountabilityRouter.get(
  '/',
  AccountabilityValidator.getAll,
  requiresLogin,
  AccountabilityController.getAll
);
AccountabilityRouter.get(
  '/:id',
  AccountabilityValidator.getById,
  requiresLogin,
  AccountabilityController.getById
);
AccountabilityRouter.post(
  '/',
  AccountabilityValidator.create,
  requiresLogin,
  checksUserIsAdmin,
  AccountabilityController.create
);
AccountabilityRouter.put(
  '/:id',
  AccountabilityValidator.update,
  requiresLogin,
  checksUserIsAdmin,
  AccountabilityController.update
);
AccountabilityRouter.delete(
  '/:id',
  AccountabilityValidator.delete,
  requiresLogin,
  checksUserIsAdmin,
  AccountabilityController.delete
);

module.exports = AccountabilityRouter;