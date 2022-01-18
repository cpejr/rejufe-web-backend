const express = require('express');

// Principais
const ActionsRouter = require('./Acoes');
const AtasRouter = require('./Atas');
const ContactUsRouter = require('./FaleConosco');
const InformationsRouter = require('./informacoes');
const NoticesRouter = require('./Noticias');

const routes = express.Router();

// Principais
routes.use('/acoes', ActionsRouter);
routes.use('/atas', AtasRouter);
routes.use('/faleconosco', ContactUsRouter);
routes.use('/informacoes', InformationsRouter);
routes.use('/noticias', NoticesRouter);



module.exports = routes;
