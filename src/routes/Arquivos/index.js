const express = require('express');
const FilesRouter = express.Router();

const upload = require('../../middlewares/Upload.js');
const FilesController = require('../../controllers/ArquivosController.js');

FilesRouter.post(
    '/',
    upload.single('file'),
    FilesController.create
);

module.exports = FilesRouter;