const express = require('express');
const AtasRouter = express.Router();

const AtasController = require('../../controllers/AtasController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

AtasRouter.get(
    '/',
    AtasController.getAll
);
AtasRouter.get(
    '/:id',
    AtasController.getById
);
AtasRouter.post(
    '/',
    AtasController.create
);
AtasRouter.put(
    '/:id',
    AtasController.update
);
AtasRouter.delete(
    '/:id',
    AtasController.delete
);

module.exports = AtasRouter