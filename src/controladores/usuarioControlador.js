const Usuario = require('../modelos/Usuario');

exports.criar = async (req, res) => {
  try {
    const usuario = await Usuario.query().insert(req.body);
    const { senha: _, ...usuarioSemSenha } = usuario;
    res.status(201).json(usuarioSemSenha);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  const usuarios = await Usuario.query().select('id', 'nome', 'email', 'telefone', 'role');
  res.json(usuarios);
};

exports.listarSimples = async (req, res) => {
  try {
    const usuarios = await Usuario.query().select('id', 'nome', 'email', 'telefone');
    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  const usuario = await Usuario.query().findById(req.params.id).select('id', 'nome', 'email', 'telefone');
  if (!usuario) return res.status(404).json({ erro: 'Não encontrado' });
  res.json(usuario);
};

exports.atualizar = async (req, res) => {
  try {
    const usuario = await Usuario.query().patchAndFetchById(req.params.id, req.body);
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
