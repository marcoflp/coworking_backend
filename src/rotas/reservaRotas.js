const express = require('express');
const router = express.Router();
const reservaControlador = require('../controladores/reservaControlador');

router.post('/', reservaControlador.criar);
router.get('/', reservaControlador.listar);
router.get('/:id', reservaControlador.buscarPorId);
router.patch('/:id', reservaControlador.atualizar);
router.delete('/:id', reservaControlador.deletar);

module.exports = router;
