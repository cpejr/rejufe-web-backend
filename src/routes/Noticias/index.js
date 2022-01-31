const express = require('express');
const NoticeRouter = express.Router();

const NoticeController = require('../../controllers/NoticiasController.jsx');
const NoticeValidator = require('../../validators/NoticiasValidator');

const { authenticateToken, checksUserIsAdmin } = require('../../middlewares/authentication');

NoticeRouter.get(
  '/',
  NoticeController.getAll
);
NoticeRouter.get(
  '/:id',
  NoticeValidator.getById,
  authenticateToken,
  NoticeController.getById
);
NoticeRouter.post(
  '/',
  NoticeValidator.create,
  authenticateToken,
  checksUserIsAdmin,
  NoticeController.create
);
NoticeRouter.put(
  '/:id',
  NoticeValidator.update,
  authenticateToken,
  checksUserIsAdmin,
  NoticeController.update
);
NoticeRouter.delete(
  '/:id',
  NoticeValidator.delete,
  authenticateToken,
  checksUserIsAdmin,
  NoticeController.delete
);

module.exports = NoticeRouter;
