const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DataSchema = new mongoose.Schema({
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

DataSchema.pre('save', async function(next) {
    const hash_email = await bcrypt.hash(this.email, 10);
    const hash_Msg = await bcrypt.hash(this.Msg, 10);
    
    this.email = hash_email;
    this.Msg = hash_Msg;
   
    next();
})

const ContactUs= mongoose.model('FaleConosco', DataSchema);
module.exports = ContactUs;




