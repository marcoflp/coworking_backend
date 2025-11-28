const express = require('express');
const router = express.Router();
const salaControlador = require('../controladores/salaControlador');
const { verificarToken, verificarAdmin } = require('../middleware/auth');

router.get('/', salaControlador.listar);
router.get('/:id', salaControlador.buscarPorId);
router.post('/', verificarToken, salaControlador.criar);
router.patch('/:id', verificarToken, salaControlador.atualizar);
router.delete('/:id', verificarToken, verificarAdmin, salaControlador.deletar);

module.exports = router;
