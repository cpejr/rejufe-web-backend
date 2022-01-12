const express = require('express');
const AcoesController = require('./controllers/AcoesController.jsx')

const routes = express.Router();

routes.get('/', function(req, res) {
    res.json({message: 'Bem vindo ao Back-end'})
})

routes.get('/acoes', AcoesController.index)
routes.post('/acoes', AcoesController.store)

module.exports = routes;
