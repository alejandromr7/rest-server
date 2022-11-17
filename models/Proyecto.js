const { Sequelize } = require('sequelize');
const db = require('../db/config');
const fechaActual = require('../helpers/fecha');
const Usuario = require('./Usuario');

const Proyecto = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: Sequelize.STRING,
    descripcion: Sequelize.STRING,
    fecha: {
        type: Sequelize.STRING,
        defaultValue: fechaActual()
    },

});

Usuario.hasMany(Proyecto);

module.exports = Proyecto;