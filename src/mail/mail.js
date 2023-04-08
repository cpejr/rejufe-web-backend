const nodemailer = require('nodemailer');
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
  BirthdayNotificationEmail(to, name, fromName) {
    const subject = `Feliz aniversário, ${name}!`;
    const text = `Eu, ${fromName}, te desejo um ótimo aniversário, ${name}`;

      const emailContent = {
          to,
          subject,
          text
      };
      return Email.sendEmail(emailContent);
  },
  async ToVoteNotification({ to, name, userId, quizzTitle, quizzId }) {
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
          Por favor, <a href="${process.env.FRONTEND_URL}/ficha-enquete/${userId}/${quizzId}" target="_blank">clique aqui</a> para acessar o sistema.</p>
          </br>
          </br>
          <p><strong>Rede REJUFE</strong></p>`;

      const emailContent = {
          to,
          subject,
          text,
          html
      };
      return Email.sendEmail(emailContent);
  }
}