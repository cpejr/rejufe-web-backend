const mongoose = require('mongoose');

const Notices = new mongoose.Schema({
    doc_id: {
        type: String,
        require: true,
    },
    Type: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    archive_1: {
        type: String,
        require: false,
    },
    archive_2: {
        type: String,
        require: false,
    },
});

const Notices = mongoose.model('Atas', UserSchema);
module.exports = Notices;