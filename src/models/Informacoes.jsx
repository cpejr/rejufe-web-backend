const mongoose = require('mongoose');

const Information = new mongoose.Schema({
    number: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
        enum: ['INFORMATIVO','COMUNICADO'],
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