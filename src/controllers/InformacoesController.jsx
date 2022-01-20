const Informations = require('../models/Informacoes.jsx')

module.exports = {
    async getAll(req, res) {
        try {
            const informations = await Informations.find();
            return res.status(200).json(informations);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all informations',
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const informations = await Informations.findOne({ _id: id });
            return res.status(200).json(informations);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get an information by id',
            });
        }
    },

    async create(req, res) {
        try {
            const informations = req.body;
            await Informations.create(informations);
            return res.status(200).json(informations);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create an information',
            });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const informations = await Informations.findByIdAndDelete({ _id: id });
            return res.status(200).json({id: informations.id});
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete an information',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const informations = req.body
            const result = await Informations.findByIdAndUpdate({ _id: id }, informations);
            return res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update an return information by id',
            });
        }
    }
}