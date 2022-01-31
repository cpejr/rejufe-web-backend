const express = require('express');
const AtasRouter = express.Router();

const AtasController = require('../../controllers/AtasController.jsx');
const AtasValidator = require('../../validators/AtasValidator.js')

const { authenticateToken, checksUserIsAdmin } = require('../../middlewares/authentication');

AtasRouter.get(
    '/',
    AtasController.getAll
);
AtasRouter.get(
    '/:id',
    AtasValidator.getById,
    authenticateToken,
    AtasController.getById
);
AtasRouter.post(
    '/',
    AtasValidator.create,
    authenticateToken,
    checksUserIsAdmin,
    AtasController.create
);
AtasRouter.put(
    '/:id',
    AtasValidator.update,
    authenticateToken,
    checksUserIsAdmin,
    AtasController.update
);
AtasRouter.delete(
    '/:id',
    AtasValidator.delete,
    authenticateToken,
    checksUserIsAdmin,
    AtasController.delete
);

module.exports = AtasRouter