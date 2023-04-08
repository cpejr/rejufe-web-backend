const Attempts = require('../models/Attempts.js');

module.exports = {

    async getAttemptsByEmail(req, res) {
        try {
            const { email } = req.params;
            const result = await Attempts.findOne({ email });

            return res.status(200).json({email:result?.email, quantity:result?.quantity, lock_time: result?.lock_time});
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

    async resetByEmail(req, res) {
        try {
            const { email }= req.params;
            const result = await Attempts.findOneAndUpdate({ email }, { quantity: 0 })

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
            const { email } = req.params;
            const { lock_time } = req.body;
    
            const foundAttempt = await Attempts.findOne({ email }).exec();
            foundAttempt.quantity = foundAttempt.quantity + 1;
            foundAttempt.lock_time = lock_time

            await foundAttempt.save()
            return res.status(200).json({ notification: 'Time and attempts updated!' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to update attempts by email',
            });
        }
    },
};
