const express = require('express');
const InformationsRouter = express.Router();

const InformationsController = require('../../controllers/InformacoesController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

InformationsRouter.get(
    '/',
    InformationsController.index
);
InformationsRouter.get(
    '/:id',
    InformationsController.detail
);
InformationsRouter.post(
    '/',
    InformationsController.store
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
