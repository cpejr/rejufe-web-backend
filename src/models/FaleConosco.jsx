const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ContactUs = new mongoose.Schema({
    contact_id: {
        type: String,
        require: true,
    },
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

UserSchema.pre('save', async function(next) {
    const hash_email = await bcrypt.hash(this.email, 10);
    const hash_Msg = await bcrypt.hash(this.Msg, 10);
    
    this.email = hash_email;
    this.Msg = hash_Msg;
   
    next();
})

const ContactUs= mongoose.model('FaleConosco', UserSchema);
module.exports = ContactUs;




