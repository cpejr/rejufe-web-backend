const Actions = require('../models/Acoes.js');

module.exports = {
    async getAll(req, res) {
        try {
            const limit = 50;
            const times = req.query.times;
            const actions = await Actions.find().limit(limit).skip(limit * times);
            return res.status(200).json(actions);
        } catch (err) {
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
            return res.status(200).json(actions);
        } catch (err) {
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
            return res.status(200).json(action);
        } catch (err) {
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
            return res.status(200).json({ id: actions.id });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a bank',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const action = req.body;
            const actions = await Actions.findByIdAndUpdate({ _id: id }, action);
            return res.status(200).json(actions);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update a bank by id',
            });
        }
    },
};
