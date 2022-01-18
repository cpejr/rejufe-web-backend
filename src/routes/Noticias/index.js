const express = require('express');
const NoticeRouter = express.Router();

const NoticeController = require('../../controllers/NoticiasController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

NoticeRouter.get(
  '/',
  NoticeController.index
);
NoticeRouter.get(
  '/:id',
  NoticeController.detail
);
NoticeRouter.post(
  '/',
  NoticeController.store
);
NoticeRouter.put(
  '/:id',
  NoticeController.update
);
NoticeRouter.delete(
  '/:id',
  NoticeController.delete
);

module.exports = NoticeRouter
