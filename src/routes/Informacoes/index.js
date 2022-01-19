const express = require('express');
const InformationsRouter = express.Router();

const InformationsController = require('../../controllers/InformacoesController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

InformationsRouter.get(
    '/',
    InformationsController.getAll
);
InformationsRouter.get(
    '/:id',
    InformationsController.getById
);
InformationsRouter.post(
    '/',
    InformationsController.create
);
InformationsRouter.put(
    '/:id',
    InformationsController.update
);
InformationsRouter.delete(
    '/:id',
    InformationsController.delete
);

module.exports = InformationsRouter
