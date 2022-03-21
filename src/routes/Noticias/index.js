const express = require('express');
const NoticeRouter = express.Router();

const NoticeController = require('../../controllers/NoticiasController.js');
const NoticeValidator = require('../../validators/NoticiasValidator');
const upload = require('../../middlewares/upload.js');

const { requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

NoticeRouter.get(
  '/',
  NoticeValidator.getAll,
  NoticeController.getAll
);
NoticeRouter.get(
  '/:id',
  NoticeValidator.getById,
  requiresLogin,
  NoticeController.getById
);
NoticeRouter.post(
  '/',
  upload.any(),
  NoticeValidator.create,
  requiresLogin,
  checksUserIsAdmin,
  NoticeController.create
);
NoticeRouter.put(
  '/:id',
  NoticeValidator.update,
  requiresLogin,
  checksUserIsAdmin,
  NoticeController.update
);
NoticeRouter.delete(
  '/:id',
  NoticeValidator.delete,
  requiresLogin,
  checksUserIsAdmin,
  NoticeController.delete
);

module.exports = NoticeRouter;
