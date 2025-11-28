const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { nome, email, telefone, senha } = req.body;
    
    const senhaHash = await bcrypt.hash(senha, 10);
    
    const usuario = await Usuario.query().insert({
      nome,
      email,
      telefone,
      senha: senhaHash,
      role: 'user'
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    res.status(201).json(usuarioSemSenha);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    const usuario = await Usuario.query().findOne({ email });
    
    if (!usuario || !usuario.senha) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { senha: _, ...usuarioSemSenha } = usuario;
    
    res.json({ 
      token, 
      usuario: usuarioSemSenha 
    });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.query().findById(req.usuario.id);
    const { senha: _, ...usuarioSemSenha } = usuario;
    res.json(usuarioSemSenha);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
