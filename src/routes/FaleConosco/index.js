const express = require('express');
const ContactUsRouter = express.Router();

const ContactUsController = require('../../controllers/FaleConoscoController.js');
const ContactUsValidator = require('../../validators/FaleConoscoValidator.js')

const { authenticateToken } = require('../../middlewares/authentication');

ContactUsRouter.get(
    '/',
    ContactUsValidator.getAll,
    ContactUsController.getAll
);
ContactUsRouter.get(
    '/:id',
    ContactUsValidator.getById,
    ContactUsController.getById
);
ContactUsRouter.post(
    '/',
    ContactUsValidator.create,
    ContactUsController.create
);
ContactUsRouter.put(
    '/:id',
    ContactUsValidator.update,
    ContactUsController.update
);
ContactUsRouter.delete(
    '/:id',
    ContactUsValidator.delete,
    ContactUsController.delete
);

module.exports = ContactUsRouter