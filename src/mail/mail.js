const nodemailer = require('nodemailer');
const { create } = require('../models/Usuario');
require("dotenv").config();

const testAccount = nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
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
    async BirthdayNotificationEmail(to, name, fromName) {
        const from = 'projetorejufe@gmail.com';
        const content = `Eu, ${fromName}, te desejo um ótimo aniversário, ${name}`;
        const subject = `Feliz aniversário, ${name}!`;

        const emailContent = {
            from,
            to,
            subject,
            text: content,
        };
        return transporter.sendMail(emailContent).catch((err) => {
            console.err(err);
        });

    }
}