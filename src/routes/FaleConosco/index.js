const express = require('express');
const ContactUsRouter = express.Router();

const ContactUsController = require('../../controllers/FaleConoscoController.jsx');
const ContactUsValidator = require('../../validators/FaleConoscoValidator.js')

const { authenticateToken } = require('../../middlewares/authentication');

ContactUsRouter.get(
    '/',
    ContactUsController.getAll
);
ContactUsRouter.get(
    '/:id',
    ContactUsValidator.getById,
    authenticateToken,
    ContactUsController.getById
);
ContactUsRouter.post(
    '/',
    ContactUsValidator.create,
    authenticateToken,
    ContactUsController.create
);
ContactUsRouter.put(
    '/:id',
    ContactUsValidator.update,
    authenticateToken,
    ContactUsController.update
);
ContactUsRouter.delete(
    '/:id',
    ContactUsValidator.delete,
    authenticateToken,
    ContactUsController.delete
);

module.exports = ContactUsRouter