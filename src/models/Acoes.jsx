const mongoose = require('mongoose');

const Actions = new mongoose.Schema({
    action_id: {
        type: String,
        require: true,
    },
    Type: {
        type: String,
        require: true,
        enum:['ADMINISTRATIVAS','JUDICIAIS'],
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

const Actions = mongoose.model('Acoes', UserSchema);
module.exports = Actions;