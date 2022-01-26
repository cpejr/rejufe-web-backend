const express = require('express');
const AtasRouter = express.Router();

const AtasController = require('../../controllers/AtasController.jsx');
const AtasValidator = require('../../validators/AtasValidator.js')

const { authenticateToken } = require('../../middlewares/authentication');

AtasRouter.get(
    '/',
    AtasValidator.getAll,
    AtasController.getAll
);
AtasRouter.get(
    '/:id',
    AtasValidator.getById,
    AtasController.getById
);
AtasRouter.post(
    '/',
    AtasValidator.create,
    AtasController.create
);
AtasRouter.put(
    '/:id',
    AtasValidator.update,
    AtasController.update
);
AtasRouter.delete(
    '/:id',
    AtasValidator.delete,
    AtasController.delete
);

module.exports = AtasRouter