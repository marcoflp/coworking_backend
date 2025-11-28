const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');
const { verificarToken, verificarAdmin, verificarProprioUsuario } = require('../middleware/auth');

router.get('/', verificarToken, usuarioControlador.listar);
router.post('/', usuarioControlador.criar);
router.get('/:id', usuarioControlador.buscarPorId);
router.patch('/:id', verificarToken, verificarProprioUsuario, usuarioControlador.atualizar);
router.delete('/:id', verificarToken, verificarAdmin, usuarioControlador.deletar);

module.exports = router;
