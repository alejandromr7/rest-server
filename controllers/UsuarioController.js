const db = require("../db/config");


const consultar = async (req, res) => {
    const [consulta] = await db.query('SELECT * FROM servicios');
    res.json(consulta);
}

const crearUsuario = async (req, res) => {
    const body = req.body;
    res.json({ msg: 'Welcome to Jamaica!', usuario: body });
}

module.exports = { crearUsuario, consultar }