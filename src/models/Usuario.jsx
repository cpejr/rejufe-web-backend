const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        require: true,
        select: false,
    },
    firebaseId: {
        type: String,
        unique: true,
        require: true,
        select: false,
    },
    Type: {
        type: String,
        require: true,
    },
    nome: {
        type: String,
        require: true,
    },
    usuario: {
        type: String,
        require: true,
        unique: true,
    },
    cargo: {
        type: String,
        require: true,
    },
    nacionalidade: {
        type: String,
        require: true,
    },
    CPF: {
        type: String,
        require: true,
        unique: true,
        default: Number,
    },
    nascimento: {
        type: String,
        require: true,
    },
    naturalidade: {
        type: String,
        require: true,
    },
    sexo :{
        type: String,
        require: false,
    },
    estadoCivil: {
        type: String,
        require: true,
    },
    conjuge: {
        type: String,
        require: true,
    },
    nascimento: {
        type: String,
        require: true,
    },
    filhos :{
        type: String,
        require: true,
    },
    CEP: {
        type: String,
        require: true,
        default: Number,
    },
    endereco: {
        type: String,
        require: true,
    },
    numero: {
        type: String,
        require: true,
        default: Number,
    },
    complemento: {
        type: String,
        require: false,
    },
    bairro: {
        type: String,
        require: true,
    },
    cidade: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        require: true,
    },
    lotacao: {
        type: String,
        require: true,
    },
    atuacao: {
        type: String,
        require: true,
    },
    CEP_pessoal: {
        type: String,
        require: true,
        default: Number,
    },
    endereco_pessoal: {
        type: String,
        required: true,
    },
    numero_pessoal: {
        type: String,
        require: true,
        default: Number,
    },
    complemento_pessoal: {
        type: String,
        require: false,
    },
    bairro_pessoal: {
        type: String,
        require: true,
    },
    cidade_pessoal: {
        type: String,
        require: true,
    },
    estado_pessoal: {
        type: String,
        require: true,
    },
    telefone: {
        type: String,
        require: true,
        default: Number,
        unique: true,
    },
    fax: {
        type: String,
        require: true,
        default: Number,
        unique: true,
    },
    celular: {
        type: String,
        require: true,
        unique: true,
        default: Number,
    },
    e_mail: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    email_REJUFE: {
        type: Boolean,
        require: true,
    },
    email_ASCOM: {
        type: Boolean,
        require: true,
    },
    admissao: {
        type: String,
        require: true,
    },
});

// UserSchema.pre('save', async function(next) {
//     const hash_user = await bcrypt.hash(this.user_id, 10);
//     const hash_firebase = await bcrypt.hash(this.firebaseId, 10);
    
//     this.user_id = hash_user;
//     this.firebaseId = hash_firebase;
//     // precisa criptografar algum campo? 
//     // Esses campos criptografados já recebram o token, então é redundante

//     next();
// })

const Usuario = mongoose.model('Usuario', UserSchema);
module.exports = Usuario;