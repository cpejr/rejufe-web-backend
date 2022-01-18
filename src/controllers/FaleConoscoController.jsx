const ContactUs = require('../models/FaleConosco.jsx')

module.exports = {
    async index(req, res){
        try {
            const contactUs = await ContactUs.find();
            res.json(contactUs)
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get all contactUs',
            });
        }
    },

    async detail(req, res){
        try{
            const {id} = req.params;
            const contactUs = await ContactUs.findOne({_id: id});
            res.json(contactUs)
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to get a contactUs by id',
            });
        }
    },

    async store(req, res){
        try{
            const contactUs = req.body;
            await ContactUs.create(contactUs);
            res.json(contactUs)
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to create a contactUs',
            });
        }
    },

    async delete(req, res){
        try{
            const {id} = req.params;
            const contactUs = await ContactUs.findByIdAndDelete({_id: id});
            res.json(contactUs)
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                notification: 'Internal server error while trying to delete a contactUs',
            });
        }
    },

    async update(req, res){
        try{
            const {id} = req.params;
            const contactUs = req.body
            const result = await ContactUs.findByIdAndUpdate({_id: id}, contactUs);
            res.json(result)
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                notification:
                    'Internal server error while trying to update a contactUs by id',
            });
        }
    }
}