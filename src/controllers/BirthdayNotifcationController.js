const UserController = require('./UsuarioController');
const mail = require('../mail/mail');


module.exports = {
  async sendEmail(req, res) {
    const { email, name } = UserController.getUsersByTodaysBirthday;
    mail.ContactUsForm(
      email,
      name
    )
  }
}
