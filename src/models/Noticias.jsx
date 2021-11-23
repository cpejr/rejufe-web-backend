const mongoose = require('mongoose');

const NewsLetterSchema = new mongoose.Schema({
    noticia_id: {
        type: String,
        require: true,
    },
    seccao: {
        type: String,
        require: false,
    },
    Type: {
        type: String,
        require: false,
    },
    title: {
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
    photos: {
        type: String,
        require: false,
    },
    Date: {
        type: String,
        require: true,
        default: Date,
    },
    Status: {
        type: String,
        require: true,
    },
    enviarSite: {
        type: Boolean,
        require: true,
    },
});

const NewsLetter = mongoose.model('Noticias', UserSchema);
module.exports = NewsLetter;