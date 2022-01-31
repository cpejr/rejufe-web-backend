const express = require('express');
const AccountabilityRouter = express.Router();

const AccountabilityController = require('../../controllers/PrestacaoDeContasController.jsx');
const AccountabilityValidator = require('../../validators/PrestacaoDeContasValidator');

const { authenticateToken, checksUserIsAdmin } = require('../../middlewares/authentication');

AccountabilityRouter.get(
  '/',
  AccountabilityController.getAll
);
AccountabilityRouter.get(
  '/:id',
  AccountabilityValidator.getById,
  authenticateToken,
  AccountabilityController.getById
);
AccountabilityRouter.post(
  '/',
  AccountabilityValidator.create,
  authenticateToken,
  checksUserIsAdmin,
  AccountabilityController.create
);
AccountabilityRouter.put(
  '/:id',
  AccountabilityValidator.update,
  authenticateToken,
  checksUserIsAdmin,
  AccountabilityController.update
);
AccountabilityRouter.delete(
  '/:id',
  AccountabilityValidator.delete,
  authenticateToken,
  checksUserIsAdmin,
  AccountabilityController.delete
);

module.exports = AccountabilityRouter;