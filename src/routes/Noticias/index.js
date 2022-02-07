const express = require('express');
const NoticeRouter = express.Router();

const NoticeController = require('../../controllers/NoticiasController.js');
const NoticeValidator = require('../../validators/NoticiasValidator');

const { authenticateToken } = require('../../middlewares/authentication');

NoticeRouter.get(
  '/',
  NoticeValidator.getAll,
  NoticeController.getAll
);
NoticeRouter.get(
  '/:id',
  NoticeValidator.getById,
  NoticeController.getById
);
NoticeRouter.post(
  '/',
  NoticeValidator.create,
  NoticeController.create
);
NoticeRouter.put(
  '/:id',
  NoticeValidator.update,
  NoticeController.update
);
NoticeRouter.delete(
  '/:id',
  NoticeValidator.delete,
  NoticeController.delete
);

module.exports = NoticeRouter;
