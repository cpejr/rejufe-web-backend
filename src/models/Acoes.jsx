const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    action_id: {
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

const Actions = mongoose.model('Acoes', DataSchema);
module.exports = Actions;