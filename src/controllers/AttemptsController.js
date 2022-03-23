const Attempts = require('../models/Attempts.js');

module.exports = {

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
                notification: 'Internal server error while trying to delete attempts',
            });
        }
    },

    async updateTimeByEmail(req, res) {
        try {
            const email = req.body.params.email;
            const time = req.body.params.time;
            const { quantity } = await Attempts.findOne({ email });
            await Attempts.findOneAndUpdate({email}, {quantity: quantity + 1})
            await Attempts.findOneAndUpdate({email}, {lock_time: time })

            return res.status(200).json({notification: 'Time and attempts updated!'});
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to update attempts by email',
            });
        }
    },
};
