const app = require('./app');
const knex = require('knex');
const knexConfig = require('../knexfile');

const porta = process.env.PORT || 4000;

async function iniciarServidor() {
  try {
    console.log('🔧 Verificando banco de dados...');
    const db = knex(knexConfig);
    
    // Executar migrations
    await db.migrate.latest();
    console.log('✅ Migrations OK');
    
    // Executar seeds se necessário
    try {
      await db.seed.run();
      console.log('✅ Seeds OK');
    } catch (err) {
      console.log('ℹ️ Seeds já executados');
    }
    
    await db.destroy();
    
    app.listen(porta, () => {
      console.log(`🚀 Servidor rodando na porta ${porta}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar:', error);
    process.exit(1);
  }
}

iniciarServidor();
