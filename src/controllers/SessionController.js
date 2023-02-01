const jwt = require('jsonwebtoken');
const Firebase = require('../utils/Firebase');
const session = require('express-session');
const UsuarioModel = require('../models/Usuario.js');

module.exports = {
  async forgottenPassword(request, response) {
    try {
      const { email } = request.body;
      const res = await Firebase.firebaseChangeUserPassword(email);
      return response.status(200).json({ res });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        notification: 'Error while trying to send reset password email',
      });
    }
  },
  async signIn(request, response) {
    try {
      const { email, password, rememberMe } = request.body;

      let firebaseId;
      try {
        firebaseId = await Firebase.login(email, password);
      } catch (error) {
        return response
          .status(403)
          .json({ notification: 'Invalid credentials' });
      }
      const user = await UsuarioModel.findOne({ firebaseId });
      const accessToken = rememberMe
        ? jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24 * 5,
          })
        : jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 60 * 8,
          });

      request.session.cookie.maxAge = rememberMe
        ? 1000 * 60 * 60 * 24 * 5
        : 1000 * 60 * 60 * 8; // 5 dias se true ou 8 horas se false
      request.session.user = user;

      console.log('Sessão quando no Sign In: ', { session: request.session });

      return response.status(200).json({ user, accessToken });
    } catch (error) {
      console.warn(error);
      return response.status(500).json({
        notification: 'Internal server error while trying to get User',
      });
    }
  },
};
