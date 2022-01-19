const express = require('express');
const AccountabilityRouter = express.Router();

const AccountabilityController = require('../../controllers/PrestacaoDeContasController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

AccountabilityRouter.get(
  '/',
  AccountabilityController.getAll
);
AccountabilityRouter.get(
  '/:id',
  AccountabilityController.getById
);
AccountabilityRouter.post(
  '/',
  AccountabilityController.create
);
AccountabilityRouter.put(
  '/:id',
  AccountabilityController.update
);
AccountabilityRouter.delete(
  '/:id',
  AccountabilityController.delete
);

module.exports = AccountabilityRouter