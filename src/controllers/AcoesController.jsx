const Actions = require('../models/Acoes.jsx')

module.exports = {
    async getAll(req, res) {
        try {
            const actions = await Actions.find();
            res.json(actions)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all bank',
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const actions = await Actions.findOne({ _id: id });
            res.json(actions)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a bank by id',
            });
        }
    },

    async create(req, res) {
        try {
            const action = req.body;
            await Actions.create(action);
            res.json(action)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create a bank',
            });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const actions = await Actions.findByIdAndDelete({ _id: id });
            res.json(actions)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a bank',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const action = req.body
            const actions = await Actions.findByIdAndUpdate({ _id: id }, action);
            res.json(actions)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update a bank by id',
            });
        }
    }
}