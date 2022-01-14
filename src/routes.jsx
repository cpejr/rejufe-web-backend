const express = require('express');
const AcoesController = require('./controllers/AcoesController.jsx')

const routes = express.Router();

routes.get('/', function(req, res) {
    res.json({message: 'Bem vindo ao Back-end'})
})

routes.get('/acoes', AcoesController.index)
routes.get('/acoes/:_id', AcoesController.detail)
routes.post('/acoes', AcoesController.store)
routes.delete('/acoes/:_id', AcoesController.delete)
routes.put('/acoes/', AcoesController.update)

module.exports = routes;
