const Actions = require('../models/Acoes.jsx')

module.exports = {
    async index(req, res){
        const actions = await Actions.find();
        res.json(actions)
    },

    async detail(req, res){
        const {_id} = req.params;
        const actions = await Actions.findOne({_id: _id});
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
    },

    async delete(req, res){
        const {_id} = req.params;
        const actions = await Actions.findByIdAndDelete({_id: _id});
        res.json(actions)
    },

    async update(req, res){
        const { _id, action_id, Type, date, description, archive_1, archive_2 } = req.body;
        
        let dataCreate = {}

        dataCreate = {
            action_id, Type, date, description, archive_1, archive_2
        }

        const actions = await Actions.findByIdAndUpdate({_id}, dataCreate, {new: true});
        res.json(actions)
    }
}