const express = require('express');
const sessionRouter = express.Router();

const SessionController = require('../../controllers/SessionController.jsx');
const SessionValidator = require('../../validators/SessionValidator');

const { authenticateToken, checksUserIsAdmin } = require('../../middlewares/authentication');

sessionRouter.post(
    '/forgotten_password',
     SessionController.forgottenPassword
     );

sessionRouter.post(
    '/',
     SessionValidator.signIn,
     authenticateToken,
     checksUserIsAdmin,
     SessionController.signIn);

module.exports = sessionRouter;