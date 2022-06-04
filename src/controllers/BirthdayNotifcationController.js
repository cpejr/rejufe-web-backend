const UserController = require('./UsuarioController');
const mail = require('../mail/mail');
const axios = require('axios');


module.exports = {
  async sendEmail(req, res) {
    try {
      const users = await axios.get('http://localhost:3333/usuario/getUsersByTodaysBirthday');
      const userInfo = users?.data;
      let email;
      for (const user in userInfo) {
        email = await mail.BirthdayNotificationEmail(
          userInfo[user]?.email,
          userInfo[user]?.name,
          req?.session?.user?.name
        )
      }
      return res.status(200).json(email);
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to send birthday email',
      });
    }
  }
}
