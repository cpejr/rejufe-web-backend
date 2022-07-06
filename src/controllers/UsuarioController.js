const { SchemaTypeOptions } = require('mongoose');
const moment = require('moment');
const User = require('../models/Usuario.js');
const ExternalUser = require('../models/UsuarioExterno.js');
const Firebase = require('../utils/Firebase');

module.exports = {
    async create(req, res) {
        const user = req.body;
        let uid;

        try {
            const randomPassword = Math.random().toString(36).slice(-8);

            uid = await Firebase.createNewUser(user.email, randomPassword);

            delete randomPassword;
            user.firebaseId = uid;

            await User.create(user);

            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            if (uid) {
                await Firebase.deleteUser(uid);
            }
            if (err.code === 'auth/email-already-in-use') {
                return res.status(500).json({
                    notification: 'Email already in use',
                });
            }
            if (err.code === 11000 && Object.keys(err.keyValue)[0] === 'cpf') {
                return res.status(500).json({
                    notification: 'CPF already in use',
                });
            }
            if (err.code === 11000 && Object.keys(err.keyValue)[0] === 'user') {
                return res.status(500).json({
                    notification: 'User already in use',
                });
            }
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
    async getExternalUserById(req, res) {
        try {
            const { id } = req.params;
            const externalUser = await ExternalUser.findOne({ _id: id });
            return res.status(200).json(externalUser);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a external user by id',
            });
        }
    },
    async getUserEmailByUsername(req, res) {
        try {
            const { user } = req.query;
            const userData = await User.findOne({ user });

            if (userData === null) {
                return res.status(500).json({
                    notification: 'Usuário inválido',
                });
            }
            const { email } = userData;
            return res.status(200).json(email);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a email by user',
            });
        }
    },

    async getUserEmailByCpf(req, res) {
        try {
            const { cpf } = req.query;
            const { email } = await User.findOne({ 'cpf': cpf });
            return res.status(200).json(email);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a email by user',
            });
        }
    },

    async getUsersByTodaysBirthday(req, res) {
        try {
            const date = new Date();
            const day = moment(date).format('DD');
            const month = moment(date).format('MM');
            const users = await User.aggregate([
                { 
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: [{ $dayOfMonth: '$birth' }, { $dayOfMonth: new Date() }] },
                        { $eq: [{ $month: '$birth' }, { $month: new Date() }] },
                      ],
                    },
                  }
                },
                { $project: {name: "$name", email: "$email", cell_phone_number: "$cell_phone_number" }},
              ])
            return res.status(200).json(users);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get users by birthday',
            });
        }
    },

    async getExcludedAssociate(req, res) {
        try {
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
