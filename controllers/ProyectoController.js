const { where, json } = require("sequelize");
const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");


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

    try {
        const proyectoAlmacenado = await Proyecto.create(proyecto);
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const editarProyecto = async (req, res) => {
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


    try {
        proyecto.nombre = req.body.nombre || proyecto.nombre;
        proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
        proyecto.cliente = req.body.cliente || proyecto.cliente;
        const proyectoAlmacenado = await proyecto.save();
        console.log(proyectoAlmacenado);
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarProyecto = async (req, res) => {
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


    try {
        await Proyecto.destroy({ where: { id } });
        res.json({ msg: `El proyecto ${id} ha sido eliminado correctamente`, error: true });
    } catch (error) {
        console.log(error);
    }
}


const agregarColaborador = async (req, res) => { }

const eliminarColaborador = async (req, res) => { }

const obtenerTareas = async (req, res) => {
    const { id } = req.params;

    const proyecto = await Proyecto.findOne({
        where: {
            id
        },
        include: [
            { model: Tarea }
        ]
    });

    if (!proyecto) {
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if (proyecto.usuarioId !== req.usuario.id) {
        const error = new Error('No eres el propietario de este proyecto!');
        return res.status(404).json({ msg: error.message });
    }

    res.json(proyecto);

}

module.exports = { obtenerProyectos, obtenerProyecto, nuevoProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador, obtenerTareas }