const mongoose = require('mongoose');

const AttemptsSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
});

const Attempts = mongoose.model('Attempts', AttemptsSchema);
module.exports = Attempts;