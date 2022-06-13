const Noticias = require('../models/Noticias.js');
var Grid = require("gridfs-stream");
var mongoose = require("mongoose");
const Notice = require('../models/Noticias.js');

let gfs, gridfsBucket;
mongoose.connection.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });

  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

module.exports = {
  async create(req, res) {
    try {
      const noticias = req.body;
      const files = req.files;
      files.forEach(file => {
        noticias[`${file.fieldname}`] = file.id;
      })
      await Noticias.create(noticias);
      return res.status(200).json(noticias);
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
        notification: 'Internal server error while trying to create a noticias',
      });
    }
  },
  async getAll(req, res) {
    try {
      const limit = 50;
      const times = req.query.times;
      const noticias = await Noticias.find().limit(limit).skip(limit * times);
      return res.status(200).json(noticias);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get all noticias',
      });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const noticias = await Noticias.findOne({ _id: id });
      return res.status(200).json(noticias);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get a noticias by id',
      });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const notices = req.body;
      const files = req.files;
      console.log("🚀 ~ file: NoticiasController.js ~ line 80 ~ update ~ result", files);
      const notice = await Noticias.findOne({ _id: id });
      files?.forEach(file => {
        if (notice[`${file.fieldname}`]) {
          gridfsBucket.delete(ObjectId(notice[`${file.fieldname}`]));
        } 
        notices[`${file.fieldname}`] = file.id;
      })
      const result = await Noticias.findByIdAndUpdate({ _id: id }, notices);
      console.log("🚀 ~ file: NoticiasController.js ~ line 79 ~ update ~ result", result);
      return res.status(200).json(result);
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
        notification:
          'Internal server error while trying to update an notice by id',
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const noticias = await Noticias.findByIdAndDelete({ _id: id });
      return res.status(200).json({ id: noticias.id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to delete a noticias',
      });
    }
  },
};
