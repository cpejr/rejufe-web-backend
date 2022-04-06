const mongoose = require('mongoose');
const Decimal128 = mongoose.Schema.Types.Decimal128

const AcoesSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true,
        enum: ['ADMINISTRATIVAS', 'JUDICIAIS'],
    },
    numberAction: {
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

const Actions = mongoose.model('Acoes', AcoesSchema);
module.exports = Actions;