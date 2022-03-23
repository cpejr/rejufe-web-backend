const express = require('express');
const AttemptsRouter = express.Router();

const AttemptsController = require('../../controllers/AttemptsController.js');
const AttemptsValidator = require('../../validators/AttemptsValidator.js');

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

AttemptsRouter.get(
    '/getAttemptsByEmail',
    AttemptsController.getAttemptsByEmail,
    AttemptsValidator.getAttemptsByEmail

)
AttemptsRouter.post(
    '/',
    AttemptsController.create,
    AttemptsValidator.create
);
AttemptsRouter.put(
    '/deleteByEmail',
    AttemptsController.deleteByEmail,
    AttemptsValidator.deleteByEmail
);

AttemptsRouter.put(
    '/updateTime',
    AttemptsController.updateTimeByEmail,
    AttemptsValidator.updateTimeByEmail
);

module.exports = AttemptsRouter