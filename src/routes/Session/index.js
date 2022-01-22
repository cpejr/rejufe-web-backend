const express = require('express');
const sessionRouter = express.Router();

const SessionController = require('../../controllers/SessionController.jsx');
const SessionValidator = require('../../validators/SessionValidator');

sessionRouter.post('/', SessionValidator.signIn, SessionController.signIn);

module.exports = sessionRouter;