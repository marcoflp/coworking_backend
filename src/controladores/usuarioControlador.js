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
  const usuarios = await Usuario.query().select('id', 'nome', 'email');
  res.json(usuarios);
};

exports.buscarPorId = async (req, res) => {
  const usuario = await Usuario.query().findById(req.params.id);
  if (!usuario) return res.status(404).json({ erro: 'Não encontrado' });
  const { senha: _, ...usuarioSemSenha } = usuario;
  res.json(usuarioSemSenha);
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
