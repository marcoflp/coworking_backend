const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');

router.post('/', usuarioControlador.criar);
router.get('/', usuarioControlador.listar);
router.get('/:id', usuarioControlador.buscarPorId);
router.patch('/:id', usuarioControlador.atualizar);
router.delete('/:id', usuarioControlador.deletar);

module.exports = router;
