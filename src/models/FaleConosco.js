const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ContactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
});


const ContactUs = mongoose.model('FaleConosco', ContactUsSchema);
module.exports = ContactUs;




