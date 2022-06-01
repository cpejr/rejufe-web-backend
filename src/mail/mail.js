const nodemailer = require('nodemailer');
const { create } = require('../models/Usuario');
require("dotenv").config();

const testAccount = nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        type: 'OAuth2',
        user: 'projetorejufe@gmail.com',
        serviceClient: process.env.CLIENT_ID,
        privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
});

class Email {
    static sendEmail(request) {
        const config = {
            from: `${process.env.EMAIL_LOGIN}`,
            ...request,
        };
        try {
            transporter.sendMail(config);
        } catch (error) {
            return console.error(error);
        }
    }
}

module.exports = {
    ContactUsForm(to, email, name, message) {
        const content = `Email do associado: ${email} \n
      Nome do associado: ${name} \n
      Mensagem: ${message}`;
        const subject = 'Fale Conosco - Nova Mensagem';

        const emailContent = {
            to,
            subject,
            text: content,
        };
        return Email.sendEmail(emailContent);
    },
    async BirthdayNotificationEmail(to, name) {
        console.log(process.service_account_key);
        const from = 'projetorejufe@gmail.com';
        const content = `Eu, ${process.env.name}, te desejo um ótimo aniversário ${name}`;
        const subject = `Feliz aniversário, ${name}!`;

        const emailContent = {
            from,
            to,
            subject,
            text: content,
        };
        return transporter.sendMail(emailContent).catch((err) => {
            console.error(err);
        });

    }
}