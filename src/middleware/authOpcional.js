const jwt = require('jsonwebtoken');

const authOpcional = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
    } catch (err) {
      // Token inválido, mas continua sem autenticação
    }
  }
  
  next();
};

module.exports = authOpcional;
