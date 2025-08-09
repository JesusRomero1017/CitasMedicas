// app.js
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const citasRoutes = require('./routes/citas');
const sequelize = require('./config/database');
const citasController = require('./controllers/citasController');
const authController = require('./controllers/authController');
const session = require('express-session');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs'); // EJS
app.use(express.static('public')); // Para CSS/JS estático

app.use(session({
  secret: 'algo_super_seguro',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // opcionalmente agregar:
    maxAge: 1000 * 60 * 60, // 1 hora
    // secure: false, // true solo en HTTPS
  }
}));

function estaLogueado(req, res, next) {
  if (req.session.usuario) {
    return next();
  }
  res.redirect('/login'); // o '/auth/login' dependiendo cómo definiste
}

app.get('/principal', estaLogueado, (req, res) => {
  res.render('principal', { usuario: req.session.usuario });
});


// Rutas
app.get('/principal', estaLogueado, (req, res) => {
  console.log('Sesión usuario:', req.session.usuario);
  res.render('principal', { usuario: req.session.usuario });
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/auth/login');
  });
});

app.use('/citas', citasRoutes);

//Prueba
app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/auth/crearCuenta', (req, res) => {
  res.render('auth/crearCuenta');
});

app.get('/index', (req, res) => {
  res.render('ventanaPrincipal');
});

app.get('/citas/agendarCita', (req, res) => {
  res.render('citas/agendarCita');
});

app.get('/consultarCitas', citasController.listarCitas);

// Mostrar formulario login
app.get('/auth/login', (req, res) => {
  res.render('auth/login', { error: null });
});

// Ruta logout para cerrar sesión
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});


// Ruta POST para login
app.post('/login', authController.login);



// Servidor
const PORT = 3000;
sequelize.sync().then(()=>{
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
});