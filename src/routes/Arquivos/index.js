const express = require('express');
const FilesRouter = express.Router();

const upload = require('../../middlewares/Upload.js');
const FilesController = require('../../controllers/ArquivosController.js');

FilesRouter.post(
    '/',
    upload.single('file'),
    FilesController.create
);

FilesRouter.get(
    '/',
    FilesController.getAll
);

FilesRouter.get(
    '/:filename',
    FilesController.getById
);

FilesRouter.delete(
    '/:id',
    FilesController.delete
);

module.exports = FilesRouter;