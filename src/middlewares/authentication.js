/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = {
  async authenticateToken(request, response, next) {
    const authHeader = request.headers.authorization;
    const [scheme, token] = authHeader && authHeader.split(' ');

    if (token === null)
      return response.status(401).json({ error: 'No token provided' });

    if (!/^Bearer$/i.test(scheme))
      return response.status(401).json({ error: 'Token badformatted' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err)
        return response
          .status(403)
          .json({ error: 'Invalid authorization token' });

      request.session.user = data?.user;

      next();
    });
  },
  async requiresLogin(request, response, next) {
    if (request.session && request.session.user) {
      return next();
    } else {
      return response
        .status(401)
        .json({ error: 'You must be logged in to view this page.' });
    }
  },
  async checksUserIsAdmin(request, response, next) {
    /* Verificar se o usuario logado na sessão é do tipo administrator */
    if (
      request.session &&
      request.session.user &&
      request.session.user.type === 'administrador'
    ) {
      next();
    } else {
      response
        .status(403)
        .json({ error: 'Access denied. The user is not an administrator' });
    }
  },
};
