const express = require('express');
const FilesRouter = express.Router();

const upload = require('../../middlewares/upload.js');
const FilesController = require('../../controllers/ArquivosController.js');

const { requiresLogin, checksUserIsAdmin } = require('../../middlewares/authentication');

FilesRouter.post(
    '/',
    requiresLogin,
    checksUserIsAdmin,
    upload.single('file'),
    FilesController.create
);

FilesRouter.get(
    '/getFileNameById',
    requiresLogin,
    FilesController.getFileNameById
);

FilesRouter.get(
    '/',
    requiresLogin,
    checksUserIsAdmin,
    FilesController.getAll
);

FilesRouter.get(
    '/getFileNameById',
    requiresLogin,
    FilesController.getFileNameById
);

FilesRouter.get(
    '/:id',
    requiresLogin,
    FilesController.getById
);

FilesRouter.get(
    '/image/:id',
    requiresLogin,
    FilesController.getImageById
);

FilesRouter.delete(
    '/:id',
    requiresLogin,
    FilesController.delete
);

FilesRouter.get(
    '/image/:id',
    requiresLogin,
    FilesController.getImageById
);

module.exports = FilesRouter;
