// crearAdmin.js
const bcrypt = require('bcrypt');
const sequelize = require('./config/database'); // tu instancia de Sequelize
const Usuario = require('./models/usuario');    // tu modelo Usuario

async function crearAdmin() {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Conexión establecida.');

    // Crear la tabla si no existe (opcional)
    await sequelize.sync();

    // Contraseña en texto plano
    const passwordPlano = 'admin123';

    // Hashear contraseña
    const hash = await bcrypt.hash(passwordPlano, 10);

    // Crear usuario admin
    const [user, created] = await Usuario.findOrCreate({
      where: { usuario: 'admin' },
      defaults: {
        password: hash,
        rol: 'Admin'
      }
    });

    if (created) {
      console.log('Usuario admin creado con éxito');
    } else {
      console.log('El usuario admin ya existe');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

crearAdmin();

