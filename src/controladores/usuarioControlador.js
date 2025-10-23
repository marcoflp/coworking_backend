const Usuario = require('../modelos/Usuario');

exports.criar = async (req, res) => {
  try {
    const usuario = await Usuario.query().insert(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  const usuarios = await Usuario.query();
  res.json(usuarios);
};

exports.buscarPorId = async (req, res) => {
  const usuario = await Usuario.query().findById(req.params.id);
  if (!usuario) return res.status(404).json({ erro: 'Não encontrado' });
  res.json(usuario);
};

exports.atualizar = async (req, res) => {
  try {
    const usuario = await Usuario.query().patchAndFetchById(req.params.id, req.body);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  await Usuario.query().deleteById(req.params.id);
  res.json({ deletado: true });
};
