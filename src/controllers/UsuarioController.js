const { SchemaTypeOptions } = require('mongoose');
const User = require('../models/Usuario.js');
const ExternalUser = require('../models/UsuarioExterno.js');
const Firebase = require('../utils/Firebase');

module.exports = {
    async create(req, res) {
        try {
            const user = req.body;
            const randomPassword = Math.random().toString(36).slice(-8);
            const uid = await Firebase.createNewUser(user.email, randomPassword);

            delete randomPassword;
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
    async createExternalAssociate(req, res) {
        try {
            const user = req.body;

            await ExternalUser.create(user);
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
            const user = await User.find().skip(req.query.times * 50).limit(50);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all users',
            });
        }
    },

    async getUsersBySection(req, res) {
        try {
            const limit = 50;
            const times = req.query.times;
            const { section } = req.params;
            const user = await User.find({ judicial_section: section }).limit(limit).skip(limit * times);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all users',
            });
        }
    },
    async getExternalAssociates(req, res) {
        try {
            const limit = 50;
            const times = req.query.times;
            const user = await ExternalUser.find().limit(limit).skip(limit * times);

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

    async getExcludedAssociate(req, res){
        try{
            const { status } = req.query;
            const user = await User.find({ status });
            return res.status(200).json(user)
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
    async deleteExternalAssociate(req, res) {
        try {
            const { id } = req.params;
            const user = await ExternalUser.findByIdAndDelete({ _id: id });
            return res.status(200).json({ id: user.id });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a user',
            });
        }
    },
};
