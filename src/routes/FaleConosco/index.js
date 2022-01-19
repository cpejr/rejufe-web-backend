const express = require('express');
const ContactUsRouter = express.Router();

const ContactUsController = require('../../controllers/FaleConoscoController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

ContactUsRouter.get(
    '/',
    ContactUsController.getAll
);
ContactUsRouter.get(
    '/:id',
    ContactUsController.getById
);
ContactUsRouter.post(
    '/',
    ContactUsController.create
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