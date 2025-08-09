const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.get('/menu', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // Si no está logueado, vuelve a login
  }
  res.render('principal');
});

module.exports = router;