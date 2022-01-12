const Actions = require('../models/Acoes.jsx')

module.exports = {
    async index(req, res){
        const actions = await Actions.find();
        res.json(actions)
    },

    async store(req, res){
        const { action_id, Type, date, description, archive_1, archive_2 } = req.body;
        
        let dataCreate = {}

        dataCreate = {
            action_id, Type, date, description, archive_1, archive_2
        }

        const actions = await Actions.create(dataCreate);
        res.json(actions)
    }
}