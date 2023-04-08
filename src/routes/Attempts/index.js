const express = require('express');
const AttemptsRouter = express.Router();

const AttemptsController = require('../../controllers/AttemptsController.js');
const AttemptsValidator = require('../../validators/AttemptsValidator.js');

AttemptsRouter.get(
    '/getAttemptsByEmail/:email',
    AttemptsValidator.getAttemptsByEmail,
    AttemptsController.getAttemptsByEmail,

)
AttemptsRouter.post(
    '/',
    AttemptsValidator.create,
    AttemptsController.create,
);
AttemptsRouter.put(
    '/resetByEmail/:email',
    AttemptsValidator.resetByEmail,
    AttemptsController.resetByEmail,
);

AttemptsRouter.put(
    '/updateTime/:email',
    AttemptsValidator.updateTimeByEmail,
    AttemptsController.updateTimeByEmail,
);

module.exports = AttemptsRouter