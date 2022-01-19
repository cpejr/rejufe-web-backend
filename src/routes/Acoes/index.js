const express = require('express');
const ActionsRouter = express.Router();

const ActionsController = require('../../controllers/AcoesController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

ActionsRouter.get(
    '/',
    ActionsController.getAll
);
ActionsRouter.get(
    '/:id',
    ActionsController.getById
);
ActionsRouter.post(
    '/',
    ActionsController.create
);
ActionsRouter.put(
    '/:id',
    ActionsController.update
);
ActionsRouter.delete(
    '/:id',
    ActionsController.delete
);

module.exports = ActionsRouter;