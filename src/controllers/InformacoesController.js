const Informations = require('../models/Informacoes.js');
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
            const informations = await Informations.find().skip(req.query.times * 50).limit(50);
            return res.status(200).json(informations);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all informations',
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const informations = await Informations.findOne({ _id: id });
            return res.status(200).json(informations);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get an information by id',
            });
        }
    },

    async create(req, res) {
        try {
            const informations = req.body;
            const files = req.files;
            files?.forEach(file => {
                informations[`${file.fieldname}`] = file.id;
            })
            await Informations.create(informations);
            return res.status(200).json(informations);
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
                notification: 'Internal server error while trying to create an information',
            });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const informations = await Informations.findByIdAndDelete({ _id: id });
            return res.status(200).json({ id: informations.id });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete an information',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const informations = req.body;
            const files = req.files;
            const information = await Informations.findOne({ _id: id });
            files?.forEach(file => {
                if (information[`${file.fieldname}`]) {
                  gridfsBucket.delete(mongoose.Types.ObjectId(information[`${file.fieldname}`]));
                } 
                informations[`${file.fieldname}`] = file.id;
              })
            const result = await Informations.findByIdAndUpdate({ _id: id }, informations);
            return res.status(200).json(result);
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
                    'Internal server error while trying to update a models by id',
            });
        }
    },
};
