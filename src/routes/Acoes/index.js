const express = require('express');
const ActionsRouter = express.Router();

const ActionsController = require('../../controllers/AcoesController.js');
const ActionsValidator = require('../../validators/AcoesValidator.js')

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

ActionsRouter.get(
    '/',
    ActionsValidator.getAll,
    requiresLogin,
    ActionsController.getAll
);
ActionsRouter.get(
    '/:id',
    ActionsValidator.getById,
    requiresLogin,
    ActionsController.getById
);
ActionsRouter.post(
    '/',
    ActionsValidator.create,
    requiresLogin,
    checksUserIsAdmin,
    ActionsController.create
);
ActionsRouter.put(
    '/:id',
    ActionsValidator.update,
    requiresLogin,
    checksUserIsAdmin,
    ActionsController.update
);
ActionsRouter.delete(
    '/:id',
    ActionsValidator.delete,
    requiresLogin,
    checksUserIsAdmin,
    ActionsController.delete
);

module.exports = ActionsRouter;