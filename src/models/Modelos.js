const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true,
        enum: ['REQUERIMENTOS ADMINISTRATIVOS', 'PETIÇÕES INICIAIS', 'JURISPRUDÊNCIA'],
    },
    numberModels: {
        type: String,
        require: false,
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

const Models = mongoose.model('Modelos', ModelSchema);
module.exports = Models;