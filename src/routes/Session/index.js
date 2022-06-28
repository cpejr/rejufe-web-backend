const express = require('express');
const sessionRouter = express.Router();

const SessionController = require('../../controllers/SessionController.js');
const SessionValidator = require('../../validators/SessionValidator');

sessionRouter.post(
    '/forgotten_password',
     SessionController.forgottenPassword
     );

sessionRouter.post(
    '/',
     SessionValidator.signIn,
     SessionController.signIn
     );

sessionRouter.delete(
    '/',
    SessionController.logout
);

module.exports = sessionRouter;