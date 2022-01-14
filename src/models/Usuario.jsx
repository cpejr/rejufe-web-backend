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
        enum : ['ADMINISTRADOR','USUÁRIO'],
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
    },
    nascimento: {
        type: Date,
        require: true,
    },
    naturalidade: {
        type: String,
        require: true,
    },
    sexo :{
        type: String,
        require: true,
        enum : ['MASCULINO','FEMININO','OUTROS'],
    },
    estadoCivil: {
        type: String,
        require: true,
        enum : ['SOLTEIRO(A)','CASADO(A)','DIVORCIADO(A)','DESQUITADO(A)','OUTROS'],
    },
    conjuge: {
        type: String,
        require: false,
    },
    nascimento_conjuge: {
        type: Date,
        require: false,
    },
    filhos :{
        type: String,
        require: false,
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
        type: Number,
        require: true,
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
        enum : ['CEARÁ','RIO GRANDE DO NORTE','PARAÍBA','PERNAMBUCO','ALAGOAS','SERGIPE'],
    },
    atuacao: {
        type: String,
        require: true,
    },
    CEP_pessoal: {
        type: String,
        require: false,
    },
    endereco_pessoal: {
        type: String,
        required: false,
    },
    numero_pessoal: {
        type: String,
        require: false,
    },
    complemento_pessoal: {
        type: String,
        require: false,
    },
    bairro_pessoal: {
        type: String,
        require: false,
    },
    cidade_pessoal: {
        type: String,
        require: false,
    },
    estado_pessoal: {
        type: String,
        require: false,
    },
    telefone: {
        type: String,
        require: false,
        unique: true,
    },
    fax: {
        type: String,
        require: false,
        unique: true,
    },
    celular: {
        type: String,
        require: true,
        unique: true,
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
        type: Date,
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