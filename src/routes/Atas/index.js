const express = require('express');
const AtasRouter = express.Router();

const upload = require('../../middlewares/upload.js');
const AtasController = require('../../controllers/AtasController.js');
const AtasValidator = require('../../validators/AtasValidator.js')
const upload = require('../../middlewares/upload.js');

const { requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

AtasRouter.get(
    '/',
    AtasValidator.getAll,
    requiresLogin,
    AtasController.getAll
);
AtasRouter.get(
    '/:id',
    AtasValidator.getById,
    requiresLogin,
    AtasController.getById
);
AtasRouter.post(
    '/',
    upload.any(),
    AtasValidator.create,
    requiresLogin,
    checksUserIsAdmin,
    AtasController.create
);
AtasRouter.put(
    '/:id',
    upload.any(),
    AtasValidator.update,
    requiresLogin,
    checksUserIsAdmin,
    AtasController.update
);
AtasRouter.delete(
    '/:id',
    AtasValidator.delete,
    requiresLogin,
    checksUserIsAdmin,
    AtasController.delete
);

module.exports = AtasRouter