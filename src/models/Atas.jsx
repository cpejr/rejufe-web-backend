const mongoose = require('mongoose');

const AtaSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true,
        enum: ['ATAS', 'EDITAIS'],
    },
    date: {
        type: Date,
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

const Atas = mongoose.model('Atas', AtaSchema);
module.exports = Atas;