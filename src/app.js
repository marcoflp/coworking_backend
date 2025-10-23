const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');

const usuarioRotas = require('./rotas/usuarioRotas');
const salaRotas = require('./rotas/salaRotas');
const reservaRotas = require('./rotas/reservaRotas');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send({ ok: true, versao: 'coworking-api-1.0' }));

app.use('/usuarios', usuarioRotas);
app.use('/salas', salaRotas);
app.use('/reservas', reservaRotas);

module.exports = app;
