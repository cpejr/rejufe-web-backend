const express = require('express');
const InformationsRouter = express.Router();

const InformationsController = require('../../controllers/InformacoesController.js');
const InformationsValidator = require('../../validators/InformacoesValidator.js');
const upload = require('../../middlewares/Upload.js');

const { requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

InformationsRouter.get(
    '/',
    InformationsValidator.getAll,
    requiresLogin,
    InformationsController.getAll
);
InformationsRouter.get(
    '/:id',
    InformationsValidator.getById,
    requiresLogin,
    InformationsController.getById
);
InformationsRouter.post(
    '/',
    upload.any(),
    InformationsValidator.create,
    requiresLogin,
    checksUserIsAdmin,
    InformationsController.create
);
InformationsRouter.put(
    '/:id',
    InformationsValidator.update,
    requiresLogin,
    checksUserIsAdmin,
    InformationsController.update
);
InformationsRouter.delete(
    '/:id',
    InformationsValidator.delete,
    requiresLogin,
    checksUserIsAdmin,
    InformationsController.delete
);

module.exports = InformationsRouter
