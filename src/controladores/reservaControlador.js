const Reserva = require('../modelos/Reserva');

exports.criar = async (req, res) => {
  try {
    const reserva = await Reserva.query().insert(req.body);
    const completa = await Reserva.query().findById(reserva.id).withGraphFetched('[usuario,sala]');
    res.status(201).json(completa);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  const reservas = await Reserva.query().withGraphFetched('[usuario,sala]');
  res.json(reservas);
};

exports.buscarPorId = async (req, res) => {
  const reserva = await Reserva.query().findById(req.params.id).withGraphFetched('[usuario,sala]');
  if (!reserva) return res.status(404).json({ erro: 'Não encontrado' });
  res.json(reserva);
};

exports.atualizar = async (req, res) => {
  try {
    const reserva = await Reserva.query().patchAndFetchById(req.params.id, req.body);
    res.json(reserva);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  await Reserva.query().deleteById(req.params.id);
  res.json({ deletado: true });
};
