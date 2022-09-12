const nodemailer = require('nodemailer');
require("dotenv").config();

async function sendEmailTest({ from, to, subject, text, html }) {

    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

    return transporter.sendMail({
        from,
        to,
        subject,
        text,
        html
    });
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH2_CLIENTID,
        clientSecret: process.env.OAUTH2_CLIENT_SECRET,
        refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
        accessToken: process.env.OAUTH2_ACCESS_TOKEN,
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
        return transporter.sendMail(emailContent);
    },
    async ToVoteNotification({ to, name, quizzTitle }) {
        const subject = `Sistema REJUFE: Enquete pendente`;
        const text = `
            Prezado(a) ${name},
            

            A sua participação na enquete ${quizzTitle} está sendo solicitada.
            Por favor, clique aqui para acessar o sistema.


            Rede REJUFE`;
        const html = `
            <p>Prezado(a) <strong>${name}</strong>,</p>
            </br>
            </br>
            <p>A sua participação na enquete <strong>${quizzTitle}</strong> está sendo solicitada. 
            Por favor, <a href="http://localhost:3000/login" target="_blank">clique aqui</a> para acessar o sistema.</p>
            </br>
            </br>
            <p><strong>Rede REJUFE</strong></p>`;

        const emailContent = {
            from: process.env.MAIL_USERNAME,
            to,
            subject,
            text,
            html
        };
        // return transporter.sendMail(emailContent);
        return sendEmailTest(emailContent);
    }
}