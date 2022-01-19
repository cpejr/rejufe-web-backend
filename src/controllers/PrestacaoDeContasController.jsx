const Accountability = require('../models/PrestacaoDeContas.jsx')

module.exports = {
  async store(req, res) {
    try {
      const accountability = req.body;
      await Accountability.create(accountability);
      res.json(accountability)
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to create an accountability',
      });
    }
  },
  async index(req, res) {
    try {
      const accountability = await Accountability.find();
      res.json(accountability)
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get all accountabilities',
      });
    }
  },
  async detail(req, res) {
    try {
      const { id } = req.params;
      const accountability = await Accountability.findOne({ _id: id });
      res.json(accountability)
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get an accountability by id',
      });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const accountability = req.body
      const result = await Accountability.findByIdAndUpdate({ _id: id }, accountability);
      res.json(result)
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification:
          'Internal server error while trying to update an accountability by id',
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const accountability = await Accountability.findByIdAndDelete({ _id: id });
      res.json(accountability)
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to delete an accountability',
      });
    }
  }
}