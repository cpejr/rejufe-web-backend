const Actions = require('../models/Acoes.js');
var Grid = require("gridfs-stream");
var mongoose = require("mongoose");

let gfs, gridfsBucket;
mongoose.connection.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
    });

    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection("uploads");
});

module.exports = {
    async getAll(req, res) {
        try {
            const actions = await Actions.find();
            return res.status(200).json(actions);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all bank',
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const actions = await Actions.findOne({ _id: id });
            return res.status(200).json(actions);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a bank by id',
            });
        }
    },

    async create(req, res) {
        try {
            const action = req.body;
            const files = req.files;
            files?.forEach(file => {
                action[`${file.fieldname}`] = file.id;
            })
            await Actions.create(action);
            return res.status(200).json(action);
        } catch (err) {
            try {
                req?.files.forEach(file => {
                    gridfsBucket.delete(file.id);
                })
            } catch (deleteFileErr) {
                console.error(deleteFileErr);
            }
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create a action',
            });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const actions = await Actions.findByIdAndDelete({ _id: id });
            return res.status(200).json({ id: actions.id });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a bank',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const action = req.body;
            const actions = await Actions.findByIdAndUpdate({ _id: id }, action);
            return res.status(200).json(actions);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update a bank by id',
            });
        }
    },
};
