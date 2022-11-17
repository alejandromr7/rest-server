const Proyecto = require("../models/Proyecto");


const obtenerProyectos = async (req, res) => {
    const { id } = req.usuario;

    const proyectos = await Proyecto.findAll({ where: { usuarioId: id } });
    res.json(proyectos);
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;

    const proyecto = await Proyecto.findByPk(id);

    if (!proyecto) {
        const error = new Error('Proyecto no encontrado');
        return res.status(401).json({ msg: error.message, error: true });

    }

    if (proyecto.usuarioId !== req.usuario.id) {
        const error = new Error('No tienes los permisos para acceder a este proyecto');
        return res.status(401).json({ msg: error.message, error: true });
    }

    res.json(proyecto)
}

const nuevoProyecto = async (req, res) => {
    const proyecto = req.body;
    proyecto.usuarioId = req.usuario.id;
    proyecto.creador = req.usuario.nombre;
    console.log(proyecto);
    try {
        const proyectoAlmacenado = await Proyecto.create(proyecto);
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const editarProyecto = async (req, res) => { }
const eliminarProyecto = async (req, res) => { }
const agregarColaborador = async (req, res) => { }
const eliminarColaborador = async (req, res) => { }
const obtenerTareas = async (req, res) => { }

module.exports = { obtenerProyectos, obtenerProyecto, nuevoProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador, obtenerTareas }