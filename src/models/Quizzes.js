const mongoose = require('mongoose');

const QuizzesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
      type: String,
      require: true,
    },
    toVote: [{
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    }],
    alreadyVoted: [{
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    }],
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
        }
    }],
    privateResult: {
        type: Boolean,
        require: true,
        default: false,
    },
});

const Quizzes = mongoose.model('Quizzes', QuizzesSchema);
module.exports = Quizzes