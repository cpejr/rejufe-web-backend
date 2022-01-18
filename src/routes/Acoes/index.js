const express = require('express');
const ActionsRouter = express.Router();

const ActionsController = require('../../controllers/AcoesController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

ActionsRouter.get(
    '/',
    ActionsController.index
);
ActionsRouter.get(
    '/:id',
    ActionsController.detail
);
ActionsRouter.post(
    '/',
    ActionsController.store
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