// Script para testar a API localmente
const axios = require('axios');

const BASE_URL = 'http://localhost:4000';

async function testarAPI() {
  try {
    console.log('🧪 Testando API...\n');

    // Teste 1: Verificar se o servidor está rodando
    console.log('1. Testando conexão...');
    const health = await axios.get(`${BASE_URL}/`);
    console.log('✅ Servidor OK:', health.data);

    // Teste 2: Listar salas
    console.log('\n2. Listando salas...');
    const salas = await axios.get(`${BASE_URL}/salas`);
    console.log('✅ Salas:', salas.data);

    // Teste 3: Criar uma sala
    console.log('\n3. Criando sala...');
    const novaSala = {
      nome: 'Sala Teste API',
      capacidade: 10,
      localizacao: 'Andar 1',
      recursos: 'Projetor, Wi-Fi'
    };
    
    const salaCreated = await axios.post(`${BASE_URL}/salas`, novaSala);
    console.log('✅ Sala criada:', salaCreated.data);

    console.log('\n🎉 Todos os testes passaram!');
  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
  }
}

testarAPI();