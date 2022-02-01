const express = require('express');
const InformationsRouter = express.Router();

const InformationsController = require('../../controllers/InformacoesController.jsx');
const InformationsValidator = require('../../validators/InformacoesValidator.js');

const { authenticateToken, checksUserIsAdmin } = require('../../middlewares/authentication');

InformationsRouter.get(
    '/',
    InformationsValidator.getAll,
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
    checksUserIsAdmin,
    InformationsController.create
);
InformationsRouter.put(
    '/:id',
    InformationsValidator.update,
    authenticateToken,
    checksUserIsAdmin,
    InformationsController.update
);
InformationsRouter.delete(
    '/:id',
    InformationsValidator.delete,
    authenticateToken,
    checksUserIsAdmin,
    InformationsController.delete
);

module.exports = InformationsRouter
