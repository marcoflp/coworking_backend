const express = require('express');
const router = express.Router();
const salaControlador = require('../controladores/salaControlador');

router.post('/', salaControlador.criar);
router.get('/', salaControlador.listar);
router.get('/:id', salaControlador.buscarPorId);
router.patch('/:id', salaControlador.atualizar);
router.delete('/:id', salaControlador.deletar);

module.exports = router;
