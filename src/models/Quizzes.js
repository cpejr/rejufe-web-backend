const mongoose = require('mongoose');

const QuizzesSchema = new mongoose.Schema({
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
    openingDate: {
        type: Date,
        require: true,
    },
    closingDate: {
        type: Date,
        require: true,
    },
    options: [{
        description: {
            type: String,
            require: true,
        },
        votes: {
            type: Number,
            require: true,
        },
    }],
});

const Quizzes = mongoose.model('Quizzes', QuizzesSchema);
module.exports = Quizzes;