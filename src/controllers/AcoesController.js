const Actions = require('../models/Acoes.js');
var Grid = require("gridfs-stream");
var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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
            const actions = await Actions.find().skip(req.query.times * 50).limit(50);
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
            const actions = req.body;
            const files = req.files;
            const action = await Actions.findOne({ _id: id });
            files?.forEach(file => {
              if (action[`${file.fieldname}`]) {
                gridfsBucket.delete(ObjectId(action[`${file.fieldname}`]));
              } 
              actions[`${file.fieldname}`] = file.id;
            })
            const result = await Actions.findByIdAndUpdate({ _id: id }, actions);
            return res.status(200).json(actions);
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
                notification:
                    'Internal server error while trying to update an action by id',
            });
        }
    },
};
