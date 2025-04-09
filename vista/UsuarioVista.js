

const express = require('express');
const ruta1 = require('../controlador/UsuarioControlador');
const router = express.Router();
router.post('/registro', ruta1.crearUsuario);
router.post('/login', ruta1.iniciarSesion);
module.exports = router;
