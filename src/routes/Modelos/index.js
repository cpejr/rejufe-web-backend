const express = require('express');
const ModelsRouter = express.Router();

const ModelsController = require('../../controllers/ModelosController.jsx');
const ModelsValidator = require('../../validators/ModelosValidator.js');

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

ModelsRouter.get(
    '/',
    ModelsValidator.getAll,
    requiresLogin,
    ModelsController.getAll
);
ModelsRouter.get(
    '/:id',
    ModelsValidator.getById,
    requiresLogin,
    ModelsController.getById
);
ModelsRouter.post(
    '/',
    ModelsValidator.create,
    requiresLogin,
    checksUserIsAdmin,
    ModelsController.create
);
ModelsRouter.put(
    '/:id',
    ModelsValidator.update,
    requiresLogin,
    checksUserIsAdmin,
    ModelsController.update
);
ModelsRouter.delete(
    '/:id',
    ModelsValidator.delete,
    requiresLogin,
    checksUserIsAdmin,
    ModelsController.delete
);

module.exports = ModelsRouter