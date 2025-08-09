// routes/citas.js
const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

router.get('/', citasController.mostrarIndex); // NUEVA RUTA
router.get('/index', (req, res) => res.render('index')); // OPCIONAL

// GET /citas (listar)
router.get('/consultarCitas', citasController.listarCitas);

// GET /citas/nuevo
router.get('/agendarCita', citasController.formNuevaCita);

// POST /citas
router.post('/', citasController.crearCita);

// GET /citas/:id/editar
router.get('/:id/editar', citasController.formEditarCita);

// POST /citas/:id?_method=PUT (actualizar)
router.put('/:id', citasController.actualizarCita);

// POST /citas/:id/eliminar?_method=DELETE (eliminar)
router.delete('/:id', citasController.eliminarCita);

// GET /citas/:id (detalle)
router.get('/:id', citasController.mostrarCita);

module.exports = router;