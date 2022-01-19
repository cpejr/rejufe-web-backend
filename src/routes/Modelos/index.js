const express = require('express');
const ModelsRouter = express.Router();

const ModelsController = require('../../controllers/ModelosController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

ModelsRouter.get(
    '/',
    ModelsController.getAll
);
ModelsRouter.get(
    '/:id',
    ModelsController.getById
);
ModelsRouter.post(
    '/',
    ModelsController.create
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