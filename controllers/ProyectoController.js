const Proyecto = require("../models/Proyecto");


const obtenerProyectos = async (req, res) => {
    const { id } = req.usuario;

    const proyectos = await Proyecto.findAll({ where: { usuarioId: id } });
    res.json(proyectos);
}

const obtenerProyecto = async (req, res) => {

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