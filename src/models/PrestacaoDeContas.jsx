const mongoose = require('mongoose');

const Accountability = new mongoose.Schema({
    prest_id: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    PDF: {
        type: String,
        require: true,
    },
});

const Accountability = mongoose.model('PrestacaoDeContas', UserSchema);
module.exports = Accountability;