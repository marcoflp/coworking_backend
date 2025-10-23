exports.up = function(knex) {
  return knex.schema.createTable('salas', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable().unique();
    table.integer('capacidade').notNullable().defaultTo(1);
    table.string('localizacao');
    table.string('recursos');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('salas');
};
