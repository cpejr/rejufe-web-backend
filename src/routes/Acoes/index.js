const express = require('express');
const ActionsRouter = express.Router();

const ActionsController = require('../../controllers/AcoesController.jsx');
const ActionsValidator = require('../../validators/AcoesValidator.js')

const { authenticateToken, checksUserIsAdmin } = require('../../middlewares/authentication');

ActionsRouter.get(
    '/',
    ActionsValidator.getAll,
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
    checksUserIsAdmin,
    ActionsController.create
);
ActionsRouter.put(
    '/:id',
    ActionsValidator.update,
    authenticateToken,
    checksUserIsAdmin,
    ActionsController.update
);
ActionsRouter.delete(
    '/:id',
    ActionsValidator.delete,
    authenticateToken,
    checksUserIsAdmin,
    ActionsController.delete
);

module.exports = ActionsRouter;