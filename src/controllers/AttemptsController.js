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
            console.log("🚀 ~ file: AttemptsController.js ~ line 33 ~ getAttemptsByEmail ~ email", email)
            const { quantity } = await Attempts.findOne({ email });

            return res.status(200).json(quantity);
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
            console.log("🚀 ~ file: AttemptsController.js ~ line 33 ~ create ~ attempt", attempt)
            tentativa = await Attempts.create(attempt)
            console.log("🚀 ~ file: AttemptsController.js ~ line 35 ~ create ~ tentativa", tentativa)
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
            console.log("🚀 ~ file: AttemptsController.js ~ line d ~ getAttemptsByEmail ~ email", email)
            const result = await Attempts.findOneAndUpdate({email}, {quantity: 0})
            console.log("🚀 ~ file: AttemptsController.js ~ line e ~ updateAttemptsByEmail ~ result", result)

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
        console.log("🚀 ~ file: AttemptsController.js ~ line 89 ~ updateAttemptsByEmail ~ req", req.body.params.email)
        try {
            const email = req.body.params.email;
            console.log("🚀 ~ file: AttemptsController.js ~ line x ~ getAttemptsByEmail ~ email", email)
            const { quantity } = await Attempts.findOne({ email });
            const result = await Attempts.findOneAndUpdate({email}, {quantity: quantity + 1})
            console.log("🚀 ~ file: AttemptsController.js ~ line 93 ~ updateAttemptsByEmail ~ result", result)

            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get attempts by email',
            });
        }
    },
};
