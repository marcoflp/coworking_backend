const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletar usuários existentes
  await knex('reservas').del();
  await knex('usuarios').del();
  
  // Criar usuários com senha
  await knex('usuarios').insert([
    {
      id: 1,
      nome: 'Admin',
      email: 'admin@coworking.com',
      telefone: '51-99999-0000',
      senha: await bcrypt.hash('admin123', 10),
      role: 'admin'
    },
    {
      id: 2,
      nome: 'Usuario Comum',
      email: 'user@coworking.com',
      telefone: '51-99999-1111',
      senha: await bcrypt.hash('user123', 10),
      role: 'user'
    }
  ]);
  
  console.log('✅ Usuários criados:');
  console.log('👑 Admin: admin@coworking.com / admin123');
  console.log('👤 User: user@coworking.com / user123');
};
