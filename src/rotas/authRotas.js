const express = require('express');
const router = express.Router();
const authControlador = require('../controladores/authControlador');
const { verificarToken } = require('../middleware/auth');

router.post('/registrar', authControlador.registrar);
router.post('/login', authControlador.login);
router.get('/perfil', verificarToken, authControlador.perfil);

module.exports = router;
