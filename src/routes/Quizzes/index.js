const express = require('express');
const QuizzesRouter = express.Router();

const QuizzesController = require('../../controllers/QuizzesController.jsx');
const QuizzesValidator = require('../../validators/QuizzesValidator');

const { authenticateToken, requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

QuizzesRouter.get(
  '/',
  QuizzesValidator.getAll,
  requiresLogin,
  QuizzesController.getAll
);
QuizzesRouter.get(
  '/:id',
  QuizzesValidator.getById,
  requiresLogin,
  QuizzesController.getById
);
QuizzesRouter.post(
  '/',
  QuizzesValidator.create,
  requiresLogin,
  checksUserIsAdmin,
  QuizzesController.create
);
QuizzesRouter.put(
  '/:id',
  QuizzesValidator.update,
  requiresLogin,
  checksUserIsAdmin,
  QuizzesController.update
);
QuizzesRouter.delete(
  '/:id',
  QuizzesValidator.delete,
  requiresLogin,
  checksUserIsAdmin,
  QuizzesController.delete
);

module.exports = QuizzesRouter;