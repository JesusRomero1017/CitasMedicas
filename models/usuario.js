// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['Admin', 'Medico', 'Recepcionista']]
    }
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});

module.exports = Usuario;
