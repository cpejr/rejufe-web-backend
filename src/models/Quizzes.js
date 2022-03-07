const mongoose = require('mongoose');

// const toVoteSchema = new mongoose.Schema({
//     _id: {
//         type: String,
//         require: true,
//       }
// })

// const optionsSchema = new mongoose.Schema({
//     description: {
//         type: String,
//         require: true,
//     },
//     votes: {
//         type: Number
//     },
// })

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
        type: String,
        require: true,
    }],
    alreadyVoted: [{
        type: String,
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
});

// const Options = mongoose.model('Options', optionsSchema);
// const ToVote = mongoose.model('ToVote', toVoteSchema);
const Quizzes = mongoose.model('Quizzes', QuizzesSchema);
module.exports = Quizzes;