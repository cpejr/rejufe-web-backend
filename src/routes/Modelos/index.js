const express = require('express');
const ModelsRouter = express.Router();

const ModelsController = require('../../controllers/ModelosController.jsx');
const ModelsValidator = require('../../validators/ModelosValidator.js');

const { authenticateToken, checksUserIsAdmin } = require('../../middlewares/authentication');

ModelsRouter.get(
    '/',
    ModelsController.getAll
);
ModelsRouter.get(
    '/:id',
    ModelsValidator.getById,
    authenticateToken,
    checksUserIsAdmin,
    ModelsController.getById
);
ModelsRouter.post(
    '/',
    ModelsValidator.create,
    authenticateToken,
    checksUserIsAdmin,
    ModelsController.create
);
ModelsRouter.put(
    '/:id',
    ModelsValidator.update,
    authenticateToken,
    checksUserIsAdmin,
    ModelsController.update
);
ModelsRouter.delete(
    '/:id',
    ModelsValidator.delete,
    authenticateToken,
    checksUserIsAdmin,
    ModelsController.delete
);

module.exports = ModelsRouter