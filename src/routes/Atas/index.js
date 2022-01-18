const express = require('express');
const AtasRouter = express.Router();

const AtasController = require('../../controllers/AtasController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

AtasRouter.get(
    '/',
    AtasController.index
);
AtasRouter.get(
    '/:id',
    AtasController.detail
);
AtasRouter.post(
    '/',
    AtasController.store
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