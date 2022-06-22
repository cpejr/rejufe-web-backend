const mongoose = require('mongoose');

const AccountabilitySchema = new mongoose.Schema({
    date: {
        type: Date,
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
    archive_1: {
        type: String,
        require: true,
    },
});

const Accountability = mongoose.model('PrestacaoDeContas', AccountabilitySchema);
module.exports = Accountability;