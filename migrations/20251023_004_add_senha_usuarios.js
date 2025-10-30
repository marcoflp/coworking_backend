exports.up = function(knex) {
  return knex.schema.alterTable('usuarios', table => {
    table.string('senha').notNullable().defaultTo('123456');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('usuarios', table => {
    table.dropColumn('senha');
  });
};