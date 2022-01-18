const express = require('express');

// Principais
const ActionsRouter = require('./Acoes');
const AtasRouter = require('./Atas');
const ContactUsRouter = require('./FaleConosco');

const routes = express.Router();

// Principais
routes.use('/acoes', ActionsRouter);
routes.use('/atas', AtasRouter);
routes.use('/faleconosco', ContactUsRouter);

module.exports = routes;
