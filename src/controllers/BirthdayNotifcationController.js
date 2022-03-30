const BirthdayNotification = require('../models/BirthdayNotification');
const UserController = require('./UsuarioController');
const mail = require('../mail/mail');


module.exports = {
  async create(req, res) {
    const { email, name } = UserController.getUsersByTodaysBirthday;
    const message = ''
    mail.ContactUsForm(
      email,
      email,
      name,
      message
    )
  }
}
