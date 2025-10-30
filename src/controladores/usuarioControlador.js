const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { senha, ...dados } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    const dadosCompletos = { ...dados, senha: senhaHash, tipo: dados.tipo || 'usuario' };
    const usuario = await Usuario.query().insert(dadosCompletos);
    
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { senha: _, ...usuarioSemSenha } = usuario;
    res.status(201).json({ token, usuario: usuarioSemSenha });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.query().findOne({ email });
    
    if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { senha: _, ...usuarioSemSenha } = usuario;
    res.json({ token, usuario: usuarioSemSenha });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { senha, ...dados } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    const dadosCompletos = { ...dados, senha: senhaHash, tipo: dados.tipo || 'usuario' };
    const usuario = await Usuario.query().insert(dadosCompletos);
    const { senha: _, ...usuarioSemSenha } = usuario;
    res.status(201).json(usuarioSemSenha);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  const usuarios = await Usuario.query().select('id', 'nome', 'email', 'telefone', 'tipo');
  res.json(usuarios);
};

exports.buscarPorId = async (req, res) => {
  const idSolicitado = parseInt(req.params.id);
  const usuarioLogado = req.usuario;
  
  // Usuário só pode ver seus próprios dados, exceto admin
  if (usuarioLogado.tipo !== 'admin' && usuarioLogado.id !== idSolicitado) {
    return res.status(403).json({ erro: 'Acesso negado' });
  }
  
  const usuario = await Usuario.query().findById(idSolicitado).select('id', 'nome', 'email', 'telefone', 'tipo');
  if (!usuario) return res.status(404).json({ erro: 'Não encontrado' });
  res.json(usuario);
};

exports.atualizar = async (req, res) => {
  try {
    const idSolicitado = parseInt(req.params.id);
    const usuarioLogado = req.usuario;
    
    // Usuário só pode atualizar seus próprios dados, exceto admin
    if (usuarioLogado.tipo !== 'admin' && usuarioLogado.id !== idSolicitado) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }
    
    const { senha, ...dados } = req.body;
    let dadosAtualizacao = dados;
    
    if (senha) {
      dadosAtualizacao.senha = await bcrypt.hash(senha, 10);
    }
    
    const usuario = await Usuario.query().patchAndFetchById(idSolicitado, dadosAtualizacao);
    const { senha: _, ...usuarioSemSenha } = usuario;
    res.json(usuarioSemSenha);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  await Usuario.query().deleteById(req.params.id);
  res.json({ deletado: true });
};
