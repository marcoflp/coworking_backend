exports.up = function(knex) {
  return knex.schema.table('usuarios', (table) => {
    table.string('senha', 255);
    table.enum('role', ['admin', 'user']).defaultTo('user');
  });
};

exports.down = function(knex) {
  return knex.schema.table('usuarios', (table) => {
    table.dropColumn('senha');
    table.dropColumn('role');
  });
};
