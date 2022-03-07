var Grid = require("gridfs-stream");
var mongoose = require("mongoose");

// Create mongo connection
const conn = mongoose.createConnection(process.env.DB_URL);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

module.exports = {
    async getAll(req, res) {
        try {
            gfs.files.find().toArray((err, files) => {
                // Check if files
                if (!files || files.length === 0) {
                  res.render('index', { files: false });
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
                  console.log('vapinho')
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
            gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
                // Check if file
                if (!file || file.length === 0) {
                  return res.status(404).json({
                    err: 'No file exists'
                  });
                }
                // File exists
                return res.status(200).json(file);
              });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a bank by id',
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
        console.log("🚀 ~ file: ArquivosController.js ~ line 88 ~ gfs.remove ~ req.params.id", req.params.id)
        try {
            gfs.remove({ _id: req.params.id });
        
            return res.status(200).json('File deleted successfully');
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a file',
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
