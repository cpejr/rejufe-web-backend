const UserController = require('./UsuarioController');
const mail = require('../mail/mail');
const User = require('../models/Usuario.js');


module.exports = {
  async sendEmail(req, res) {
    try {
      const users = await User.aggregate([
        { 
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $dayOfMonth: '$birth' }, { $dayOfMonth: new Date() }] },
                { $eq: [{ $month: '$birth' }, { $month: new Date() }] },
              ],
            },
          }
        },
        { $project: {name: "$name", email: "$email", cell_phone_number: "$cell_phone_number" }},
      ])
      let email;
      for (const user in users) {
        email = await mail.BirthdayNotificationEmail(
          users[user]?.email,
          users[user]?.name,
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
