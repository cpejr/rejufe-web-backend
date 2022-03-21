const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const InformationSchema = new mongoose.Schema({
    number: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
        enum: ['INFORMATIVO', 'COMUNICADO'],
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

InformationSchema.plugin(AutoIncrement, { inc_field: 'informations_sequential_id' });
const Information = mongoose.model('Informacoes', InformationSchema);
module.exports = Information;