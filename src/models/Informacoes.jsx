const mongoose = require('mongoose');

const Information = new mongoose.Schema({
    registros_id: {
        type: String,
        require: true,
    },
    number: {
        type: Date,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    Type: {
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

const Information = mongoose.model('Informacoes', UserSchema);
module.exports = Information;