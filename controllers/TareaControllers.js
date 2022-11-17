const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");


const agregarTarea = async (req, res) => {
    const { proyectoId } = req.body;

    const existeProyecto = await Proyecto.findOne({ where: { id: proyectoId } });

    if (!existeProyecto) {
        const error = new Error('El proyecto no existe');
        return res.status(404).json({ msg: error.message });
    }

    if (existeProyecto.usuarioId !== req.usuario.id) {
        const error = new Error('No tienes los permisos para agregar tareas a este proyecto');
        return res.status(401).json({ msg: error.message, error: true });
    }

    try {
        const tareasAlmacenada = await Tarea.create(req.body);
        res.json(tareasAlmacenada);
    } catch (error) {
        console.log(error);
    }
}

const obtenerTarea = async (req, res) => {

}

const actualizarTarea = async (req, res) => {

}

const eliminarTarea = async (req, res) => {

}

const cambiarEstado = async (req, res) => {

}

module.exports = { agregarTarea, obtenerTarea, actualizarTarea, eliminarTarea, cambiarEstado }