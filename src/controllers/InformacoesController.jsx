const Informations = require('../models/Informacoes.jsx')

module.exports = {
    async getAll(req, res) {
        try {
            const informations = await Informations.find();
            res.json(informations)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all atas',
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const informations = await Informations.findOne({ _id: id });
            res.json(informations)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get an atas by id',
            });
        }
    },

    async create(req, res) {
        try {
            const informations = req.body;
            await Informations.create(informations);
            res.json(informations)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create an atas',
            });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const informations = await Informations.findByIdAndDelete({ _id: id });
            res.json(informations)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete an atas',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const informations = req.body
            const result = await Informations.findByIdAndUpdate({ _id: id }, informations);
            res.json(result)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update an atas by id',
            });
        }
    }
}