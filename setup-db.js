const knex = require('knex');
const knexConfig = require('./knexfile');

async function setupDatabase() {
  console.log('🔧 Configurando banco de dados...');
  
  const db = knex(knexConfig);
  
  try {
    // Executar migrations
    console.log('📦 Executando migrations...');
    await db.migrate.latest();
    console.log('✅ Migrations executadas');
    
    // Executar seeds
    console.log('🌱 Executando seeds...');
    await db.seed.run();
    console.log('✅ Seeds executados');
    
  } catch (error) {
    console.error('❌ Erro ao configurar banco:', error);
  } finally {
    await db.destroy();
  }
}

setupDatabase();