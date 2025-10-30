const Usuario = require('../modelos/Usuario');

const admin = async (req, res, next) => {
  try {
    const usuario = await Usuario.query().findById(req.usuario.id);
    if (usuario.tipo !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado. Apenas administradores.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
};

module.exports = admin;