const express = require('express');
const router = express.Router();
const salaControlador = require('../controladores/salaControlador');
const { verificarToken, verificarAdmin } = require('../middleware/auth');

router.get('/', verificarToken, salaControlador.listar);
router.get('/:id', verificarToken, salaControlador.buscarPorId);
router.post('/', verificarToken, salaControlador.criar);
router.patch('/:id', verificarToken, salaControlador.atualizar);
router.delete('/:id', verificarToken, verificarAdmin, salaControlador.deletar);

module.exports = router;
