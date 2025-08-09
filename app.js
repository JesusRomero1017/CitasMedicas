// app.js
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const citasRoutes = require('./routes/citas');
const sequelize = require('./config/database');
const citasController = require('./controllers/citasController');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs'); // EJS
app.use(express.static('public')); // Para CSS/JS estático

// Rutas
app.use('/citas', citasRoutes);

//Prueba
app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/auth/login', (req, res) => {
  res.render('auth/login');
});

app.get('/auth/crearCuenta', (req, res) => {
  res.render('auth/crearCuenta');
});

app.get('/citas/agendarCita', (req, res) => {
  res.render('citas/agendarCita');
});

app.get('/consultarCitas', citasController.listarCitas);

// Servidor
const PORT = 3000;
sequelize.sync().then(()=>{
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
});
