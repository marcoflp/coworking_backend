exports.seed = async function(knex) {
  await knex('reservas').del();
  await knex('usuarios').del();
  await knex('salas').del();

  const [u1, u2] = await knex('usuarios').insert([
    { nome: 'João Silva', email: 'joao@exemplo.com', telefone: '51-98765-4321' },
    { nome: 'Maria Santos', email: 'maria@exemplo.com', telefone: '51-91234-5678' }
  ]).returning('*');

  const [s1, s2] = await knex('salas').insert([
    { nome: 'Sala Inovação', capacidade: 6, localizacao: 'Andar 1', recursos: 'projetor,quadro branco' },
    { nome: 'Sala Colaboração', capacidade: 10, localizacao: 'Andar 2', recursos: 'tv,sistema de videoconferência' }
  ]).returning('*');

  await knex('reservas').insert([
    { usuario_id: u1.id, sala_id: s1.id, horario_inicio: knex.fn.now(), horario_fim: knex.fn.now(), proposito: 'Reunião de equipe' }
  ]);
};
