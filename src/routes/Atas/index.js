const express = require('express');
const AtasRouter = express.Router();

const AtasController = require('../../controllers/AtasController.jsx');
const AtasValidator = require('../../validators/AtasValidator.js')

const { authenticateToken } = require('../../middlewares/authentication');

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
    AtasController.create
);
AtasRouter.put(
    '/:id',
    AtasValidator.update,
    authenticateToken,
    AtasController.update
);
AtasRouter.delete(
    '/:id',
    AtasValidator.delete,
    authenticateToken,
    AtasController.delete
);

module.exports = AtasRouter