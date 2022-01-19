const Quizzes = require('../models/Quizzes.jsx')

module.exports = {
  async store(req, res) {
    try {
      const quizzes = req.body;
      await Quizzes.create(quizzes);
      res.json(quizzes)
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to create a quiz',
      });
    }
  },
  async index(req, res) {
    try {
      const quizzes = await Quizzes.find();
      res.json(quizzes)
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get all quizzes',
      });
    }
  },
  async detail(req, res) {
    try {
      const { id } = req.params;
      const quizzes = await Quizzes.findOne({ _id: id });
      res.json(quizzes)
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get a quiz by id',
      });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const quizzes = req.body
      const result = await Quizzes.findByIdAndUpdate({ _id: id }, quizzes);
      res.json(result)
    }
    catch (err) {
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
      res.json(quizzes)
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to delete a quiz',
      });
    }
  }
}