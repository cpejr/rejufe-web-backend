const Atas = require('../models/Atas.js');
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
            const atas = await Atas.find().limit(limit).skip(limit * times);
            return res.status(200).json(atas);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all atas',
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const atas = await Atas.findOne({ _id: id });
            return res.status(200).json(atas);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get an atas by id',
            });
        }
    },

    async create(req, res) {
        try {
            const atas = req.body;
            const files = req.files;
            files?.forEach(file => {
                atas[`${file.fieldname}`] = file.id;
            })
            await Atas.create(atas);
            return res.status(200).json(atas);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create an atas',
            });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const ata = await Atas.findOne({ _id: id })
            if (ata.archive_1) {
                gridfsBucket.delete(ObjectId(ata.archive_1));
            } else if (ata.archive_2) {
                gridfsBucket.delete(ObjectId(ata.archive_2));
            }
            
            const atas = await Atas.findByIdAndDelete({ _id: id });
            return res.status(200).json({ id: atas.id });
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
            const atas = req.body;
            const files = req.files;
            const ata = await Atas.findOne({ _id: id });
            files?.forEach(file => {
              if (ata[`${file.fieldname}`]) {
                gridfsBucket.delete(ObjectId(ata[`${file.fieldname}`]));
              } 
              atas[`${file.fieldname}`] = file.id;
            })
            const result = await Atas.findByIdAndUpdate({ _id: id }, atas);
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
                    'Internal server error while trying to update a atas by id',
            });
        }
    },
};
