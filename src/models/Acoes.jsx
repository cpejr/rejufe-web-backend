const mongoose = require('mongoose');
const Decimal128 = mongoose.Schema.Types.Decimal128

const DataSchema = new mongoose.Schema({
    type: {
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

const Actions = mongoose.model('Acoes', DataSchema);
module.exports = Actions;