const app = require('./app');

const porta = process.env.PORT || 4000;

app.listen(porta, () => {
  console.log(`🚀 Servidor rodando na porta ${porta}`);
});
