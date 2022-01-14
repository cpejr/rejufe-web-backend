const mongoose = require('mongoose');

const NewsLetterSchema = new mongoose.Schema({
    noticia_id: {
        type: String,
        require: true,
    },
    seccao: {
        type: String,
        require: false,
        enum: ['SITE','INTRANET'],
    },
    Type: {
        type: String,
        require: false,
        enum: ['ARTIGO','NOTÍCIAS'],
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
        type: Date,
        default: Date.now,
    },
    Status: {
        type: String,
        require: true,
        enum: ['I','A'],
    },
    enviarSite: {
        type: Boolean,
        require: true,
    },
    
});

const NewsLetter = mongoose.model('Noticias', UserSchema);
module.exports = NewsLetter;