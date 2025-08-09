// controllers/citasController.js
const Cita = require('../models/cita');

exports.mostrarIndex = (req, res) => {
  res.render('index');
};

exports.listarCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    console.log('Citas obtenidas:', citas);
    res.render('citas/consultarCitas', { citas, error: null });
  } catch (error) {
    res.render('citas/consultarCitas', { citas: [], error: 'Error al listar citas: ' + error.message });
  }
};

exports.formNuevaCita = (req, res) => {
  res.render('citas/agendarCita', { cita: null, error: null });
};

exports.crearCita = async (req, res) => {
  try {
    await Cita.create(req.body);
    res.redirect('/');
  } catch (error) {
    res.render('citas/form', {
      cita: req.body,
      error: 'Error al crear la cita: ' + error.message
    });
  }
};

exports.formEditarCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) {
      return res.redirect('/');
    }
    res.render('citas/form', { cita, error: null });
  } catch (error) {
    res.redirect('/');
  }
};

exports.actualizarCita = async (req, res) => {
  try {
    const [actualizadas] = await Cita.update(req.body, {
      where: { id: req.params.id }
    });
    if (actualizadas === 0) {
      return res.render('citas/form', {
        cita: { ...req.body, id: req.params.id },
        error: 'Cita no encontrada'
      });
    }
    res.redirect('/');
  } catch (error) {
    res.render('citas/form', {
      cita: { ...req.body, id: req.params.id },
      error: 'Error al actualizar la cita: ' + error.message
    });
  }
};

exports.eliminarCita = async (req, res) => {
  try {
    const eliminadas = await Cita.destroy({
      where: { id: req.params.id }
    });
    if (eliminadas === 0) {
      return res.redirect('/citas');
    }
    res.redirect('/');
  } catch (error) {
    res.redirect('/');
  }
};

exports.mostrarCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) {
      return res.redirect('/');
    }
    res.render('citas/show', { cita, error: null });
  } catch (error) {
    res.redirect('/');
  }
};