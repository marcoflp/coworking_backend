exports.up = async function(knex) {
  const hasRole = await knex.schema.hasColumn('usuarios', 'role');
  
  if (!hasRole) {
    await knex.schema.table('usuarios', (table) => {
      table.enum('role', ['admin', 'user']).defaultTo('user');
    });
  }
};

exports.down = function(knex) {
  return knex.schema.table('usuarios', (table) => {
    table.dropColumn('role');
  });
};
