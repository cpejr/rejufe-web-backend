const express = require('express');
const ContactUsRouter = express.Router();

const ContactUsController = require('../../controllers/FaleConoscoController.jsx');
const ContactUsValidator = require('../../validators/FaleConoscoValidator.js')

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

ContactUsRouter.get(
    '/',
    ContactUsValidator.getAll,
    ContactUsController.getAll
);
ContactUsRouter.get(
    '/:id',
    ContactUsValidator.getById,
    requiresLogin,
    ContactUsController.getById
);
ContactUsRouter.post(
    '/',
    ContactUsValidator.create,
    requiresLogin,
    ContactUsController.create
);
ContactUsRouter.put(
    '/:id',
    ContactUsValidator.update,
    requiresLogin,
    checksUserIsAdmin,
    ContactUsController.update
);
ContactUsRouter.delete(
    '/:id',
    ContactUsValidator.delete,
    requiresLogin,
    checksUserIsAdmin,
    ContactUsController.delete
);

module.exports = ContactUsRouter