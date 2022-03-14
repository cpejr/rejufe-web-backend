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
      const quizzes = await Quizzes.find().limit(limit).skip(limit * times);
      return res.status(200).json(quizzes);
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
      const quizzes = await Quizzes.find({ toVote: id }).limit(limit).skip(limit * times)
      return res.status(200).json(quizzes);
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
    try {
      const { id } = req.params;
      const quizzes = req.body;
      const result = await Quizzes.findByIdAndUpdate({ _id: id }, quizzes);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification:
          'Internal server error while trying to update a quiz by id',
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
