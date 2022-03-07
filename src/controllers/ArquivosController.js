var Grid = require("gridfs-stream");
var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Create mongo connection
const conn = mongoose.createConnection(process.env.DB_URL);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream

  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });

});

module.exports = {
    async getAll(req, res) {
        try {
            gfs.find().toArray((err, files) => {
                // Check if files
                if (!files || files.length === 0) {
                  return res.status(200).json('No files found');
                } else {
                  files.map(file => {
                    if (
                      file.contentType === 'image/jpeg' ||
                      file.contentType === 'image/png'
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
                notification: 'Internal server error while trying to get all bank',
            });
        }
    },

    async getById(req, res) {
        try {
              gfs.find({ _id: new ObjectId(req.params.id) }).toArray((err, files) => {
                // Check if file
                if (!files || files.length === 0) {
                    return res.status(200).json('No files found');
                  } else {
                    files.map(file => {
                      if (
                        file.contentType === 'image/jpeg' ||
                        file.contentType === 'image/png'
                      ) {
                        file.isImage = true;
                      } else {
                        file.isImage = false;
                      }
                    });
                    return res.status(200).json(files[0]);
                  }
              });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a file by id',
            });
        }
    },

    async create(req, res) {
        try {
            return res.status(200).json({
                notification: 'File uploaded successfully',
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to upload image',
            });
        }
    },

    async delete(req, res) {
        try {
            gfs.delete( new ObjectId(req.params.id) );
            return res.status(200).json('File deleted successfully');
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a file',
            });
        }
    },

};
