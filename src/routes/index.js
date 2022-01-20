const express = require('express');

// Principais
const ActionsRouter = require('./Acoes');
const AtasRouter = require('./Atas');
const ContactUsRouter = require('./FaleConosco');
const InformationsRouter = require('./informacoes');
const NoticesRouter = require('./Noticias');
const ModelsRouter = require('./Modelos');
const QuizzesRouter = require('./Quizzes');
const AccountabilityRouter = require('./PrestacaoDeContas');
const UserRouter = require('./Usuario');

const routes = express.Router();

// Principais
routes.use('/acoes', ActionsRouter);
routes.use('/atas', AtasRouter);
routes.use('/faleconosco', ContactUsRouter);
routes.use('/informacoes', InformationsRouter);
routes.use('/noticias', NoticesRouter);
routes.use('/modelos', ModelsRouter);
routes.use('/quizzes', QuizzesRouter);
routes.use('/prestacaodecontas', AccountabilityRouter);
routes.use('/usuario', UserRouter);




module.exports = routes;
