const jwt = require('jsonwebtoken');
const Firebase = require('../utils/firebase');
const UsuarioModel = require('../models/Usuario.jsx');

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
          .json({ notification: "Invalid credentials" });
      }
      const user = await UsuarioModel.findOne({ firebaseId: firebaseId });
      const accessToken = rememberMe ? jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5d",
      }) : jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "8h",
      });

      return response.status(200).json({ user, accessToken });
    } catch (error) {
      console.warn(error);
      return response
        .status(500)
        .json({ notification: "Internal server error while trying to get User" });
    }
  }
};