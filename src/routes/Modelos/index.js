const express = require('express');
const ModelsRouter = express.Router();

const ModelsController = require('../../controllers/ModelosController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

ModelsRouter.get(
    '/',
    ModelsController.index
);
ModelsRouter.get(
    '/:id',
    ModelsController.detail
);
ModelsRouter.post(
    '/',
    ModelsController.store
);
ModelsRouter.put(
    '/:id',
    ModelsController.update
);
ModelsRouter.delete(
    '/:id',
    ModelsController.delete
);

module.exports = ModelsRouter