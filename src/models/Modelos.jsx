const mongoose = require('mongoose');

const Models = new mongoose.Schema({
    modelos_id: {
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

const Models = mongoose.model('Modelos', UserSchema);
module.exports = Models;