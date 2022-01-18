const express = require('express');

// Principais
const ActionsRouter = require('./Acoes');

const routes = express.Router();

// Principais
routes.use('/acoes', ActionsRouter);

module.exports = routes;
