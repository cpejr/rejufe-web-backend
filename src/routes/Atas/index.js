const express = require('express');
const AtasRouter = express.Router();

const AtasController = require('../../controllers/AtasController.js');
const AtasValidator = require('../../validators/AtasValidator.js')

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

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
    AtasValidator.create,
    requiresLogin,
    checksUserIsAdmin,
    AtasController.create
);
AtasRouter.put(
    '/:id',
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