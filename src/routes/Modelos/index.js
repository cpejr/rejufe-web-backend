const express = require('express');
const ModelsRouter = express.Router();

const ModelsController = require('../../controllers/ModelosController.js');
const ModelsValidator = require('../../validators/ModelosValidator.js');
const upload = require('../../middlewares/upload.js');

const { requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

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
    upload.any(),
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