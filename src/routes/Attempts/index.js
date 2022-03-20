const express = require('express');
const AttemptsRouter = express.Router();

const AttemptsController = require('../../controllers/AttemptsController.js');
const AttemptsValidator = require('../../validators/AttemptsValidator.js');

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

AttemptsRouter.get(
    '/getAttemptsByEmail',
    AttemptsController.getAttemptsByEmail
)

AttemptsRouter.get(
    '/',
    AttemptsController.getAll,
    AttemptsValidator.getAll
);
AttemptsRouter.get(
    '/:user',
    AttemptsController.getById,
    AttemptsValidator.getById
);
AttemptsRouter.post(
    '/',
    AttemptsController.create,
    AttemptsValidator.create
);
AttemptsRouter.put(
    '/updateAttempts',
    AttemptsController.updateAttemptsByEmail,
);
AttemptsRouter.put(
    '/deleteByEmail',
    AttemptsController.deleteByEmail
);

AttemptsRouter.put(
    '/updateTime',
    AttemptsController.updateTimeByEmail
);

module.exports = AttemptsRouter