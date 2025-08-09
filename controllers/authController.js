// controllers/authController.js
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) {
      return res.render('auth/login', { error: 'Usuario no encontrado' });
    }

    const coincide = await bcrypt.compare(password, user.password);

    if (!coincide) {
      return res.render('auth/login', { error: 'Contraseña incorrecta' });
    }

    // Guardar sesión
    req.session.usuario = {
      id: user.id_usuario,
      usuario: user.usuario,
      rol: user.rol
    };

    // guardar sesión antes de redirigir y redirigir según rol
    req.session.save(err => {
      if (err) {
        console.error('Error guardando sesión:', err);
        return res.render('auth/login', { error: 'Error guardando sesión' });
      }

      if (user.rol === 'Admin') {
        return res.redirect('/principal'); // Menú principal
      } else {
        return res.redirect('/panel'); // Otra vista para usuarios normales
      }
    });

  } catch (err) {
    console.error(err);
    res.render('auth/login', { error: 'Error en el login' });
  }
};
