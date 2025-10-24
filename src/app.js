const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');

const usuarioRotas = require('./rotas/usuarioRotas');
const salaRotas = require('./rotas/salaRotas');
const reservaRotas = require('./rotas/reservaRotas');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));
app.use(express.json());

// Middleware de log para debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

app.get('/', (req, res) => res.send({ ok: true, versao: 'coworking-api-1.0' }));

app.use('/usuarios', usuarioRotas);
app.use('/salas', salaRotas);
app.use('/reservas', reservaRotas);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

module.exports = app;
