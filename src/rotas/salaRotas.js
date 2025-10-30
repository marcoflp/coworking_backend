const express = require('express');
const router = express.Router();
const salaControlador = require('../controladores/salaControlador');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', auth, salaControlador.listar);
router.get('/:id', auth, salaControlador.buscarPorId);
router.post('/', auth, salaControlador.criar);
router.patch('/:id', auth, salaControlador.atualizar);
router.delete('/:id', auth, admin, salaControlador.deletar);

module.exports = router;
