const express = require('express');
const ContactUsRouter = express.Router();

const ContactUsController = require('../../controllers/FaleConoscoController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

ContactUsRouter.get(
    '/',
    ContactUsController.index
);
ContactUsRouter.get(
    '/:id',
    ContactUsController.detail
);
ContactUsRouter.post(
    '/',
    ContactUsController.store
);
ContactUsRouter.put(
    '/:id',
    ContactUsController.update
);
ContactUsRouter.delete(
    '/:id',
    ContactUsController.delete
);

module.exports = ContactUsRouter