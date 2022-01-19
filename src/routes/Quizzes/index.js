const express = require('express');
const QuizzesRouter = express.Router();

const QuizzesController = require('../../controllers/QuizzesController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

QuizzesRouter.get(
  '/',
  QuizzesController.index
);
QuizzesRouter.get(
  '/:id',
  QuizzesController.detail
);
QuizzesRouter.post(
  '/',
  QuizzesController.store
);
QuizzesRouter.put(
  '/:id',
  QuizzesController.update
);
QuizzesRouter.delete(
  '/:id',
  QuizzesController.delete
);

module.exports = QuizzesRouter