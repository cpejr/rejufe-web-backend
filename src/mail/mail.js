const nodemailer = require('nodemailer');
const { create } = require('../models/Usuario');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASS    
    },
});

class Email {
    static sendEmail(request) {
        const config = {
            from: `${process.env.MAIL_USERNAME}`,
            ...request,
        };
        try {
            transporter.sendMail(config);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = {
    ContactUsForm(to, email, name, message) {
      const subject = 'Fale Conosco - Nova Mensagem';
      const text = `Email do associado: ${email} \n
      Nome do associado: ${name} \n
      Mensagem: ${message}`;

        const emailContent = {
            to,
            subject,
            text,
        };
        return Email.sendEmail(emailContent);
    },
    async BirthdayNotificationEmail(to, name, fromName) {
      const subject = `Feliz aniversário, ${name}!`;
      const text = `Eu, ${fromName}, te desejo um ótimo aniversário, ${name}`;

        const emailContent = {
            to,
            subject,
            text
        };
        return Email.sendEmail(emailContent);
    }
}