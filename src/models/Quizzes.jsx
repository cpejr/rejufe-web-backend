const mongoose = require('mongoose');

const Quizzes = new mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    toVote: {
        type: String,
        require: true,
    },
    alreadyVoted: {
        type: String,
        require: true,
    },
});

const Quizzes = mongoose.model('Quizzes', UserSchema);
module.exports = Quizzes;