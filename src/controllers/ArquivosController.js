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
      gridfsBucket.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
          return res.status(200).json("No files found");
        } else {
          files.map((file) => {
            if (
              file.contentType === "image/jpeg" ||
              file.contentType === "image/png"
            ) {
              file.isImage = true;
            } else {
              file.isImage = false;
            }
          });
          return res.status(200).json(files);
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: "Internal server error while trying to get all files",
      });
    }
  },

  async getById(req, res) {
    try {
      gfs.files.findOne({ _id: new ObjectId(req.params.id) }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: "No file exists",
          });
        }
        // File exists

        res.contentType(file.contentType);
        const readStream = gridfsBucket.openDownloadStream(
          new ObjectId(req.params.id)
        );
        readStream.pipe(res);
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: "Internal server error while trying to get a file by id",
      });
    }
  },

  async getImageById(req, res) {
    try {
      gfs.files.findOne({ _id: new ObjectId(req.params.id) }, (err, file) => {

        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: "No file exists",
          });
        }

        // Check if file is image
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          return res.status(404).json({
            err: "File are not a image",
          });
        }

        // File exists and is image
        res.contentType(file.contentType);
        const readStream = gridfsBucket.openDownloadStream(
          new ObjectId(req.params.id)
        );
        let data = "";
        readStream.on("data", (chunk) => {
          data += chunk.toString("base64");
        });
        readStream.on("end", () => {
          res.send(data);
        });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: "Internal server error while trying to get a file by id",
      });
    }
  },

  async create(req, res) {
    try {
      return res.status(200).json({
        notification: "File uploaded successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: "Internal server error while trying to upload a file",
      });
    }
  },

  async delete(req, res) {
    try {
      gridfsBucket.delete(new ObjectId(req.params.id));
      return res.status(200).json("File deleted successfully");
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: "Internal server error while trying to delete a file",
      });
    }
  },

  async getFileNameById(req, res) {
    try {
      const { archiveId } = req.query
      gfs.files.findOne({ _id: new ObjectId(archiveId) }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: "No file exists",
          });
        }
        // File exists

        return res.status(200).json(file.filename);
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: "Internal server error while trying to get a file by id",
      });
    }
  },
};
