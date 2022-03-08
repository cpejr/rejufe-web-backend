const Noticias = require('../models/Noticias.js');

module.exports = {
  async create(req, res) {
    try {
      console.log(req.body)
      const noticias = req.body;
      // await Noticias.create(noticias);
      return res.status(200).json(noticias);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to create a noticias',
      });
    }
  },
  async getAll(req, res) {
    try {
      const noticias = await Noticias.find();
      return res.status(200).json(noticias);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get all noticias',
      });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const noticias = await Noticias.findOne({ _id: id });
      return res.status(200).json(noticias);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to get a noticias by id',
      });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const noticias = req.body;
      const result = await Noticias.findByIdAndUpdate({ _id: id }, noticias);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification:
          'Internal server error while trying to update a noticias by id',
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const noticias = await Noticias.findByIdAndDelete({ _id: id });
      return res.status(200).json({ id: noticias.id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to delete a noticias',
      });
    }
  },
};
