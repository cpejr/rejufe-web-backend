const Accountability = require('../models/PrestacaoDeContas.js');
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
  async create(req, res) {
    try {
      const accountability = req.body;
      await Accountability.create(accountability);
      return res.status(200).json(accountability);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to create an accountability',
      });
    }
  },
  async getAll(req, res) {
    try {
      const accountability = await Accountability.find();
      return res.status(200).json(accountability);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get all accountabilities',
      });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const accountability = await Accountability.findOne({ _id: id });
      return res.status(200).json(accountability);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get an accountability by id',
      });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const accountability = req.body;
      const files = req.files;
      const account = await Accountability.findOne({ _id: id });
      gridfsBucket.delete(new ObjectId(account.pdf));
      files.forEach(file => {
        accountability[`${file.fieldname}`] = file.id;
      })
      const result = await Accountability.findByIdAndUpdate({ _id: id }, accountability);
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
          'Internal server error while trying to update an accountability by id',
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const accountability = await Accountability.findByIdAndDelete({ _id: id });
      return res.status(200).json({ id: accountability.id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to delete an accountability',
      });
    }
  },
};
