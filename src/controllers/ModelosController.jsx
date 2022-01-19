const Models = require('../models/Modelos.jsx')

module.exports = {
    async getAll(req, res) {
        try {
            const models = await Models.find();
            res.json(models)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all models',
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const models = await Models.findOne({ _id: id });
            res.json(models)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a models by id',
            });
        }
    },

    async create(req, res) {
        try {
            const models = req.body;
            await Models.create(models);
            res.json(models)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create a models',
            });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const models = await Models.findByIdAndDelete({ _id: id });
            res.json(models)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a models',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const models = req.body
            const result = await Models.findByIdAndUpdate({ _id: id }, models);
            res.json(models)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update a models by id',
            });
        }
    }
}