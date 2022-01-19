const express = require('express');
const AccountabilityRouter = express.Router();

const AccountabilityController = require('../../controllers/PrestacaoDeContasController.jsx');
const AccountabilityValidator = require('../../validators/PrestacaoDeContasValidator');

const { authenticateToken } = require('../../middlewares/authentication');

AccountabilityRouter.get(
  '/',
  AccountabilityController.getAll
);
AccountabilityRouter.get(
  '/:id',
  AccountabilityValidator.getById,
  AccountabilityController.getById
);
AccountabilityRouter.post(
  '/',
  AccountabilityValidator.create,
  AccountabilityController.create
);
AccountabilityRouter.put(
  '/:id',
  AccountabilityValidator.update,
  AccountabilityController.update
);
AccountabilityRouter.delete(
  '/:id',
  AccountabilityValidator.delete,
  AccountabilityController.delete
);

module.exports = AccountabilityRouter;