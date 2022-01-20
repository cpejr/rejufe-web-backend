const express = require('express');
const InformationsRouter = express.Router();

const InformationsController = require('../../controllers/InformacoesController.jsx');
const InformationsValidator = require('../../validators/InformacoesValidator.js');

const { authenticateToken } = require('../../middlewares/authentication');

InformationsRouter.get(
    '/',
    InformationsController.getAll
);
InformationsRouter.get(
    '/:id',
    InformationsValidator.getById,
    InformationsController.getById
);
InformationsRouter.post(
    '/',
    InformationsValidator.create,
    InformationsController.create
);
InformationsRouter.put(
    '/:id',
    InformationsValidator.update,
    InformationsController.update
);
InformationsRouter.delete(
    '/:id',
    InformationsValidator.delete,
    InformationsController.delete
);

module.exports = InformationsRouter
