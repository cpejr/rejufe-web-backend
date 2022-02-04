const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        unique: true,
        require: true,
        select: false,
    },
    type: {
        type: String,
        require: true,
        enum: ['administrador', 'usuario'],
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    user: {
        type: String,
        require: true,
        unique: true,
    },
    office: {
        type: String,
        require: true,
    },
    nacionality: {
        type: String,
        require: true,
    },
    cpf: {
        type: String,
        require: true,
        unique: true,
    },
    birth: {
        type: Date,
        require: true,
    },
    place_of_birth: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
        enum: ['MASCULINO', 'FEMININO', 'OUTROS'],
    },
    civil_state: {
        type: String,
        require: true,
        enum: ['SOLTEIRO(A)', 'CASADO(A)', 'DIVORCIADO(A)', 'DESQUITADO(A)', 'OUTROS'],
    },
    status: {
        type: String,
        require: true,
        default: 'A'
    },
    judicial_section: {
        type: String,
        require: false,
    },
    spouse: {
        type: String,
        require: false,
    },
    birth_spouse: {
        type: Date,
        require: false,
    },
    sons: {
        type: String,
        require: false,
    },
    cep: {
        type: String,
        require: true,
        default: Number,
    },
    profissional_address: {
        type: String,
        require: true,
    },
    profissional_number: {
        type: Number,
        require: true,
    },
    profissional_complement: {
        type: String,
        require: false,
    },
    profissional_district: {
        type: String,
        require: true,
    },
    profissional_city: {
        type: String,
        require: true,
    },
    profissional_state: {
        type: String,
        require: true,
    },
    allocation: {
        type: String,
        require: true,
        enum: ['CEARÁ', 'RIO GRANDE DO NORTE', 'PARAÍBA', 'PERNAMBUCO', 'ALAGOAS', 'SERGIPE'],
    },
    acting: {
        type: String,
        require: true,
    },
    personal_cep: {
        type: String,
        require: false,
    },
    personal_address: {
        type: String,
        required: false,
    },
    personal_number: {
        type: String,
        require: false,
    },
    personal_complement: {
        type: String,
        require: false,
    },
    personal_district: {
        type: String,
        require: false,
    },
    personal_city: {
        type: String,
        require: false,
    },
    personal_state: {
        type: String,
        require: false,
    },
    telephone: {
        type: String,
        require: false,
    },
    fax: {
        type: String,
        require: false,
        unique: false,
    },
    cell_phone_number: {
        type: String,
        require: true,
    },
    email_REJUFE: {
        type: Boolean,
        require: true,
    },
    email_ASCOM: {
        type: Boolean,
        require: true,
    },
    admission_date: {
        type: Date,
        require: true,
    },
});


const User = mongoose.model('Usuario', UserSchema);
module.exports = User;