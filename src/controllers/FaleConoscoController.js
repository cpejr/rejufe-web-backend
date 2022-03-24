const mail = require('../mail/mail.js');
const ContactUs = require('../models/FaleConosco.js');

module.exports = {
    async getAll(req, res) {
        try {
            const contactUs = await ContactUs.find();
            return res.status(200).json(contactUs);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all contactUs',
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const contactUs = await ContactUs.findOne({ _id: id });
            return res.status(200).json(contactUs);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a contactUs by id',
            });
        }
    },

    async create(req, res) {
        try {
            const contactUs = req.body;
            await ContactUs.create(contactUs);
            mail.ContactUsForm('matheusbastos@cpejr.com.br',req.body.email, req.body.name, req.body.message);
            return res.status(200).json(contactUs);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create a contactUs',
            });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const contactUs = await ContactUs.findByIdAndDelete({ _id: id });
            return res.status(200).json({ id: contactUs.id });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a contactUs',
            });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const contactUs = req.body;
            const result = await ContactUs.findByIdAndUpdate({ _id: id }, contactUs);
            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update a contactUs by id',
            });
        }
    },
};
