const express = require('express');
const QuizzesRouter = express.Router();

const QuizzesController = require('../../controllers/QuizzesController.jsx');
const QuizzesValidator = require('../../validators/QuizzesValidator');

const { authenticateToken } = require('../../middlewares/authentication');

QuizzesRouter.get(
  '/',
  QuizzesController.getAll
);
QuizzesRouter.get(
  '/:id',
  QuizzesValidator.getById,
  authenticateToken,
  QuizzesController.getById
);
QuizzesRouter.post(
  '/',
  QuizzesValidator.create,
  authenticateToken,
  QuizzesController.create
);
QuizzesRouter.put(
  '/:id',
  QuizzesValidator.update,
  authenticateToken,
  QuizzesController.update
);
QuizzesRouter.delete(
  '/:id',
  QuizzesValidator.delete,
  authenticateToken,
  QuizzesController.delete
);

module.exports = QuizzesRouter;