exports.up = function(knex) {
  return knex.schema.createTable('reservas', function(table) {
    table.increments('id').primary();
    table.integer('usuario_id').unsigned().notNullable().references('id').inTable('usuarios').onDelete('CASCADE');
    table.integer('sala_id').unsigned().notNullable().references('id').inTable('salas').onDelete('CASCADE');
    table.timestamp('horario_inicio').notNullable();
    table.timestamp('horario_fim').notNullable();
    table.string('proposito');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('reservas');
};
