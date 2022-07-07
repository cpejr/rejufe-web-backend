const Quizzes = require('../models/Quizzes.js');

module.exports = {
  async create(req, res) {
    try {
      const quizzes = req.body;
      await Quizzes.create(quizzes);
      return res.status(200).json(quizzes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to create a quiz',
      });
    }
  },
  async getAll(req, res) {
    try {
      const limit = 50;
      const times = req.query.times;
      const date = req.query.date;
      const quizzes = await Quizzes.find().limit(limit).skip(limit * times);
      let allQuizzes = quizzes?.map((quizz) => {
        if (quizz?.privateResult === true && quizz.closingDate > date ) {
          quizz['options'] = undefined;
          quizz['toVote'] = undefined;
          return quizz
        } else {
          return quizz
        }
        
    })
      return res.status(200).json(allQuizzes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get all quizzes',
      });
    }
  },

  async getToVoteQuizzes(req, res) {
    try {
      const limit = 50;
      const times = req.query.times;
      const { id } = req.params;
      const date = req.query.date;
      const quizzes = await Quizzes.find({ $or:[{ toVote: id }, { alreadyVoted: id }], openingDate: { $lte: date } }).limit(limit).skip(limit * times);
      let allQuizzes = quizzes?.map((quizz) => {
        if (quizz?.privateResult === true && quizz.closingDate > date ) {
          quizz['options'] = undefined;
          quizz['toVote'] = undefined;
          return quizz
        } else {
          return quizz
        }
        
    })
      return res.status(200).json(allQuizzes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get all quizzes',
      });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const quizzes = await Quizzes.findOne({ _id: id });
      return res.status(200).json(quizzes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get a quiz by id',
      });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const date = new Date();
    const quizz = await Quizzes.findOne({ _id: id });
    if (quizz.closingDate > date) {
      try {
        const quizzes = req.body;
        const result = await Quizzes.findByIdAndUpdate({ _id: id }, quizzes);
        return res.status(200).json({_id:result?.id, alreadyVoted:result?.alreadyVoted, closingDate: result?.closingDate, description: result?.description, openingDate: result?.openingDate, title: result?.title, toVote: result?.toVote});
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          notification:
            'Internal server error while trying to update a quiz by id',
        });
      }
    } else {
      return res.status(500).json({
        notification:
          'Não é mais possível votar/alterar o quizz',
      }); 
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const quizzes = await Quizzes.findByIdAndDelete({ _id: id });
      return res.status(200).json({ id: quizzes.id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to delete a quiz',
      });
    }
  },
};