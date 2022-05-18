const UserController = require('./UsuarioController');
const mail = require('../mail/mail');
const axios = require('axios');


module.exports = {
  async sendEmail(req, res) {
    try {

      const users = axios.get('http://localhost:3333/usuario/getUsersByTodaysBirthday');
      //      const users = UserController.getUsersByTodaysBirthday;
      console.log(users.name);

      await mail.BirthdayNotificationEmail(
        users.email,
        users.name
      )
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to send birthday email',
      });
    }
  }
}
