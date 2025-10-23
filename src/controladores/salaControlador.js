const Sala = require('../modelos/Sala');

exports.criar = async (req, res) => {
  try {
    const sala = await Sala.query().insert(req.body);
    res.status(201).json(sala);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  const salas = await Sala.query();
  res.json(salas);
};

exports.buscarPorId = async (req, res) => {
  const sala = await Sala.query().findById(req.params.id);
  if (!sala) return res.status(404).json({ erro: 'Não encontrado' });
  res.json(sala);
};

exports.atualizar = async (req, res) => {
  try {
    const sala = await Sala.query().patchAndFetchById(req.params.id, req.body);
    res.json(sala);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  await Sala.query().deleteById(req.params.id);
  res.json({ deletado: true });
};
