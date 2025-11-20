const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Rotas públicas
router.post('/registrar', usuarioControlador.registrar);
router.post('/login', usuarioControlador.login);

// Rotas protegidas
router.post('/', auth, usuarioControlador.criar);
router.get('/', auth, usuarioControlador.listar);
router.get('/:id', auth, usuarioControlador.buscarPorId);
router.patch('/:id', auth, usuarioControlador.atualizar);
router.delete('/:id', auth, admin, usuarioControlador.deletar);

module.exports = router;
