const express = require('express');

// Principais
const ActionsRouter = require('./Acoes');
const AtasRouter = require('./Atas');

const routes = express.Router();

// Principais
routes.use('/acoes', ActionsRouter);
routes.use('/atas', AtasRouter);

module.exports = routes;
