const express = require('express');
const ActionsRouter = express.Router();

const ActionsController = require('../../controllers/AcoesController.jsx');
const ActionsValidator = require('../../validators/AcoesValidator.js')

const { authenticateToken } = require('../../middlewares/authentication');

ActionsRouter.get(
    '/',
    ActionsController.getAll
);
ActionsRouter.get(
    '/:id',
    ActionsValidator.getById,
    authenticateToken,
    ActionsController.getById
);
ActionsRouter.post(
    '/',
    ActionsValidator.create,
    authenticateToken,
    ActionsController.create
);
ActionsRouter.put(
    '/:id',
    ActionsValidator.update,
    authenticateToken,
    ActionsController.update
);
ActionsRouter.delete(
    '/:id',
    ActionsValidator.delete,
    authenticateToken,
    ActionsController.delete
);

module.exports = ActionsRouter;