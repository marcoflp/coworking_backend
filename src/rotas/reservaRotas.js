const express = require('express');
const router = express.Router();
const reservaControlador = require('../controladores/reservaControlador');
const { verificarToken, verificarAdmin } = require('../middleware/auth');

router.post('/', verificarToken, reservaControlador.criar);
router.get('/', verificarToken, reservaControlador.listar);
router.get('/:id', verificarToken, reservaControlador.buscarPorId);
router.patch('/:id', verificarToken, reservaControlador.atualizar);
router.delete('/:id', verificarToken, verificarAdmin, reservaControlador.deletar);

module.exports = router;
