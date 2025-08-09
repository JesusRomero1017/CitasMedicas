// models/cita.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Cita = sequelize.define('Cita', {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: 'Cita',
  timestamps: false
});

module.exports = Cita;
