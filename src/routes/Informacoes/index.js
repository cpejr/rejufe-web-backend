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
    authenticateToken,
    InformationsController.getById
);
InformationsRouter.post(
    '/',
    InformationsValidator.create,
    authenticateToken,
    InformationsController.create
);
InformationsRouter.put(
    '/:id',
    InformationsValidator.update,
    authenticateToken,
    InformationsController.update
);
InformationsRouter.delete(
    '/:id',
    InformationsValidator.delete,
    authenticateToken,
    InformationsController.delete
);

module.exports = InformationsRouter
