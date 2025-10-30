const express = require('express');
const router = express.Router();
const reservaControlador = require('../controladores/reservaControlador');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, reservaControlador.criar);
router.get('/', auth, reservaControlador.listar);
router.get('/:id', auth, reservaControlador.buscarPorId);
router.patch('/:id', auth, reservaControlador.atualizar);
router.delete('/:id', auth, admin, reservaControlador.deletar);

module.exports = router;
