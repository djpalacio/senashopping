const express = require('express');
const ruta2 = require('../controlador/ProductoControlador');

const router = express.Router();


router.post('/crearCategoria', ruta2.crearCategoria);
router.post('/crearProducto', ruta2.crearProducto);
router.post('/actualizarInventario', ruta2.actualizarInventario);
router.get('/filtrarPorNombre', ruta2.filtrarPorNombre);
router.get('/filtrarPorCategoria', ruta2.filtrarPorCategoria);
router.post('/agregarResena', ruta2.agregarResena);
router.get('/resenasPorNombreProducto', ruta2.obtenerResenasPorNombreProducto);

module.exports = router;
