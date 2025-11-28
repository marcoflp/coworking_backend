const Reserva = require('../modelos/Reserva');

exports.criar = async (req, res) => {
  try {
    console.log('📥 Body recebido:', req.body);
    let { usuario_id, sala_id, horario_inicio, horario_fim, proposito } = req.body;
    
    console.log('🔢 Antes conversão - usuario_id:', usuario_id, 'tipo:', typeof usuario_id);
    console.log('🔢 Antes conversão - sala_id:', sala_id, 'tipo:', typeof sala_id);
    
    // Converter para número
    usuario_id = parseInt(usuario_id);
    sala_id = parseInt(sala_id);
    
    console.log('✅ Após conversão - usuario_id:', usuario_id, 'tipo:', typeof usuario_id);
    console.log('✅ Após conversão - sala_id:', sala_id, 'tipo:', typeof sala_id);
    
    // Validar se as datas são válidas
    if (horario_inicio && !Date.parse(horario_inicio)) {
      return res.status(400).json({ erro: 'horario_inicio deve ser uma data válida' });
    }
    if (horario_fim && !Date.parse(horario_fim)) {
      return res.status(400).json({ erro: 'horario_fim deve ser uma data válida' });
    }
    
    // Validar se horário fim é depois do início
    if (new Date(horario_inicio) >= new Date(horario_fim)) {
      return res.status(400).json({ erro: 'horario_fim deve ser posterior ao horario_inicio' });
    }
    
    // Verificar conflitos de horário
    const conflito = await Reserva.query()
      .where('sala_id', sala_id)
      .where(function() {
        this.where(function() {
          this.where('horario_inicio', '<', horario_fim)
            .andWhere('horario_fim', '>', horario_inicio);
        });
      });
    
    if (conflito.length > 0) {
      return res.status(400).json({ erro: 'Horário já reservado para esta sala' });
    }
    
    const reserva = await Reserva.query().insert({
      usuario_id,
      sala_id,
      horario_inicio,
      horario_fim,
      proposito
    });
    console.log('Reserva criada:', reserva);
    const completa = await Reserva.query().findById(reserva.id).withGraphFetched('[usuario,sala]');
    console.log('Reserva completa:', completa);
    res.status(201).json(completa);
  } catch (err) {
    console.error('Erro ao criar reserva:', err);
    res.status(400).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    console.log('Listando reservas...');
    const reservas = await Reserva.query().withGraphFetched('[usuario,sala]');
    console.log('Reservas encontradas:', reservas.length);
    res.json(reservas);
  } catch (err) {
    console.error('Erro ao listar reservas:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  const reserva = await Reserva.query().findById(req.params.id).withGraphFetched('[usuario,sala]');
  if (!reserva) return res.status(404).json({ erro: 'Não encontrado' });
  res.json(reserva);
};

exports.atualizar = async (req, res) => {
  try {
    const { sala_id, horario_inicio, horario_fim } = req.body;
    
    // Se está atualizando horários, validar
    if (horario_inicio && horario_fim) {
      if (new Date(horario_inicio) >= new Date(horario_fim)) {
        return res.status(400).json({ erro: 'horario_fim deve ser posterior ao horario_inicio' });
      }
      
      // Verificar conflitos (excluindo a própria reserva)
      const conflito = await Reserva.query()
        .where('sala_id', sala_id || (await Reserva.query().findById(req.params.id)).sala_id)
        .whereNot('id', req.params.id)
        .where(function() {
          this.where('horario_inicio', '<', horario_fim)
            .andWhere('horario_fim', '>', horario_inicio);
        });
      
      if (conflito.length > 0) {
        return res.status(400).json({ erro: 'Horário já reservado para esta sala' });
      }
    }
    
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
