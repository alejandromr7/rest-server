const db = require("../db/config");
const Usuario = require("../models/Usuario");


const registrar = async (req, res) => {
    const { email } = req.body;

    const existeUsuario = await Usuario.findOne({ where: { email } });
    try {

        if (existeUsuario) {
            const error = new Error('Usuario ya registrado!');
            return res.status(401).json({ msg: error.message, error: true });
        }

        await Usuario.create(req.body);
        res.json({ msg: 'Usuario guardado correctamente', error: false });
    } catch (error) {
        console.log(error);
    }
}

const crearUsuario = async (req, res) => {

}

module.exports = { registrar }