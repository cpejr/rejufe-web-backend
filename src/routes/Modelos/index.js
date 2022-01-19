const express = require('express');
const ModelsRouter = express.Router();

const ModelsController = require('../../controllers/ModelosController.jsx');
const ModelsValidator = require('../../validators/ModelosValidator.js');

const { authenticateToken } = require('../../middlewares/authentication');

ModelsRouter.get(
    '/',
    ModelsController.getAll
);
ModelsRouter.get(
    '/:id',
    ModelsValidator.getById,
    ModelsController.getById
);
ModelsRouter.post(
    '/',
    ModelsValidator.create,
    ModelsController.create
);
ModelsRouter.put(
    '/:id',
    ModelsValidator.update,
    ModelsController.update
);
ModelsRouter.delete(
    '/:id',
    ModelsValidator.delete,
    ModelsController.delete
);

module.exports = ModelsRouter