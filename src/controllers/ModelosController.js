const Models = require('../models/Modelos.js');
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
            const limit = 50;
            const times = req.query.times;
            const models = await Models.find().limit(limit).skip(limit * times);
            return res.status(200).json(models);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all models',
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const models = await Models.findOne({ _id: id });
            return res.status(200).json(models);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a models by id',
            });
        }
    },

    async create(req, res) {
        try {
            const models = req.body;
            const files = req.files;
            files.forEach(file => {
                models[`${file.fieldname}`] = file.id;
            })
            await Models.create(models);
            return res.status(200).json(models);
        } catch (err) {
            try {
                req.files.forEach(file => {
                    gridfsBucket.delete(file.id);
                })
            } catch (deleteFileErr) {
                console.error(deleteFileErr);
            }
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create a models',
            });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const models = await Models.findByIdAndDelete({ _id: id });
            return res.status(200).json({ id: models.id });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a models',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const models = req.body;
            const files = req.files;
            const model = await Models.findOne({ _id: id });
            files.forEach(file => {
              if (model[`${file.fieldname}`]) {
                console.log(model);
                gridfsBucket.delete(model[`${file.fieldname}`]);
              } 
              models[`${file.fieldname}`] = file.id;
            })
            const result = await Models.findByIdAndUpdate({ _id: id }, models);
            return res.status(200).json(models);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update a models by id',
            });
        }
    },
};
