const Attempts = require('../models/Attempts.js');

module.exports = {
    async getAll(req, res) {
        try {
            const attempt = await Attempts.find();
            return res.status(200).json(attempt);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all atas',
            });
        }
    },

    async getById(req, res) {
        try {
            const { user } = req.query;
            const { email } = await User.findOne({ user });
            const attempt = await Attempts.findOne(id);
            return res.status(200).json(attempt);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get an atas by id',
            });
        }
    },

    async getAttemptsByEmail(req, res) {
        try {
            const { email } = req.query;
            const result = await Attempts.findOne({ email });

            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get attempts by email',
            });
        }
    },

    async create(req, res) {
        try {
            const attempt = req.body;
            tentativa = await Attempts.create(attempt)
            return res.status(200).json(attempt);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create an attempt',
            });
        }
    },

    async deleteByEmail(req, res) {
        try {
            const email = req.body.params.email;
            const result = await Attempts.findOneAndUpdate({email}, {quantity: 0})

            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete an atas',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const attempt = req.body;
            const result = await Attempts.findByIdAndUpdate({ _id: id }, attempt);
            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update an atas by id',
            });
        }
    },

    async updateAttemptsByEmail(req, res) {
        try {
            const email = req.body.params.email;
            const { quantity } = await Attempts.findOne({ email });
            const result = await Attempts.findOneAndUpdate({email}, {quantity: quantity + 1})

            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get attempts by email',
            });
        }
    },

    async updateTimeByEmail(req, res) {
        try {
            const email = req.body.params.email;
            const time = req.body.params.time;
            const result = await Attempts.findOneAndUpdate({email}, {lock_time: time })

            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get attempts by email',
            });
        }
    },
};
