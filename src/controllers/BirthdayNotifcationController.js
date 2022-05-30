const UserController = require('./UsuarioController');
const mail = require('../mail/mail');
const axios = require('axios');


module.exports = {
  async sendEmail(req, res) {
    try {
      const users = await axios.get('http://localhost:3333/usuario/getUsersByTodaysBirthday');
      //      const users = UserController.getUsersByTodaysBirthday;

      const userInfo = users?.data;

      for (const user in userInfo) {
        // console.log(user.email);
        await mail.BirthdayNotificationEmail(
         userInfo[user]?.email,
         userInfo[user]?.name
        )
      }
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({
        notification: 'Internal server error while trying to send birthday email',
      });
    }
  }
}
