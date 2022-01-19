const express = require('express');
const NoticeRouter = express.Router();

const NoticeController = require('../../controllers/NoticiasController.jsx');

const { authenticateToken } = require('../../middlewares/authentication');

NoticeRouter.get(
  '/',
  NoticeController.getAll
);
NoticeRouter.get(
  '/:id',
  NoticeController.getById
);
NoticeRouter.post(
  '/',
  NoticeController.create
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
