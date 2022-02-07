const User = require('../models/Usuario.js');
const Firebase = require('../utils/Firebase');

module.exports = {
    async create(req, res) {
        try {
            const user = req.body;

            const uid = await Firebase.createNewUser(user.email, user.password);

            delete user.password;
            user.firebaseId = uid;

            await User.create(user);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create a user',
            });
        }
    },
    async getAll(req, res) {
        try {
            const user = await User.find();
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all users',
            });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id });
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a user by id',
            });
        }
    },
    async getUserEmailByUsername(req, res) {
        try {
            const { user } = req.query;
            const { email } = await User.findOne({ user });

            return res.status(200).json(email);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a email by user',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const user = req.body;
            const result = await User.findByIdAndUpdate({ _id: id }, user);
            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update a user by id',
            });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete({ _id: id });
            return res.status(200).json({ id: user.id });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a user',
            });
        }
    },
};
