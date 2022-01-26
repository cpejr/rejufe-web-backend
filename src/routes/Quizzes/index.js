const express = require('express');
const QuizzesRouter = express.Router();

const QuizzesController = require('../../controllers/QuizzesController.jsx');
const QuizzesValidator = require('../../validators/QuizzesValidator');

const { authenticateToken } = require('../../middlewares/authentication');

QuizzesRouter.get(
  '/',
  QuizzesValidator.getAll,
  QuizzesController.getAll
);
QuizzesRouter.get(
  '/:id',
  QuizzesValidator.getById,
  QuizzesController.getById
);
QuizzesRouter.post(
  '/',
  QuizzesValidator.create,
  QuizzesController.create
);
QuizzesRouter.put(
  '/:id',
  QuizzesValidator.update,
  QuizzesController.update
);
QuizzesRouter.delete(
  '/:id',
  QuizzesValidator.delete,
  QuizzesController.delete
);

module.exports = QuizzesRouter;