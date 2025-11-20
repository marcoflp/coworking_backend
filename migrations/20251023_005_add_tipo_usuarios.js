exports.up = function(knex) {
  return knex.schema.alterTable('usuarios', table => {
    table.string('tipo').notNullable().defaultTo('usuario');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('usuarios', table => {
    table.dropColumn('tipo');
  });
};