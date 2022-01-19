const express = require('express');
const AccountabilityRouter = express.Router();

const AccountabilityController = require('../../controllers/PrestacaoDeContasController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

AccountabilityRouter.get(
  '/',
  AccountabilityController.index
);
AccountabilityRouter.get(
  '/:id',
  AccountabilityController.detail
);
AccountabilityRouter.post(
  '/',
  AccountabilityController.store
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