const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

const verificarAdmin = (req, res, next) => {
  if (req.usuario.role !== 'admin') {
    return res.status(403).json({ erro: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

const verificarProprioUsuario = (req, res, next) => {
  const idRequisitado = parseInt(req.params.id);
  // Admin pode editar qualquer um
  if (req.usuario.role === 'admin') {
    return next();
  }
  // Usuário comum só pode editar a si mesmo
  if (req.usuario.id !== idRequisitado) {
    return res.status(403).json({ erro: 'Você só pode editar seu próprio perfil' });
  }
  next();
};

module.exports = { verificarToken, verificarAdmin, verificarProprioUsuario };
