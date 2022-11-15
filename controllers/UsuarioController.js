const db = require("../db/config");
const bcrypt = require('bcrypt');
const Usuario = require("../models/Usuario");
const generarJWT = require("../helpers/generarJWT");
const { json } = require("sequelize");
const generarId = require("../helpers/generarId");
const encryptarPassword = require("../helpers/hashearPassword");


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

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuar existe //
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        const error = new Error('No hay coincidencias para este usuario !');
        return res.status(404).json({ msg: error.message, error: true });
    }

    // Comprobar si el usuario esta confirmado //
    if (!usuario.confirmar) {
        const error = new Error('Tu cuenta no ha sido confirmada!');
        return res.status(403).json({ msg: error.message, error: true });
    }

    // Comprobar su password //
    const compararPassword = await bcrypt.compare(password, usuario.password);
    console.log(compararPassword);
    if (!compararPassword) {
        const error = new Error('Contraseña incorrecta!');
        return res.status(403).json({ msg: error.message, error: true });
    }

    res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: generarJWT(usuario.id)
    });
}

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Token no válido!');
        return res.status(403).json({ msg: error.message, error: true });
    }

    try {
        usuario.confirmar = true;
        usuario.token = '';
        await usuario.save();
        res.json({ msg: 'Usuario confirmado correctamente', error: false });
    } catch (error) {
        console.log(error);
    }
}


const olvidePassword = async (req, res) => {
    const { email } = req.body;

    // Comprobar si el usuar existe //
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        const error = new Error('No hay coincidencias para este usuario !');
        return res.status(404).json({ msg: error.message, error: true });
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({ msg: 'Hemos enviado un email con las instrucciones', error: false });
    } catch (error) {
        console.log(error);
    }
}


const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ where: { token } });

    if (!tokenValido) {
        const error = new Error('Token no válido!');
        return res.status(403).json({ msg: error.message, error: true });
    }

    res.json({ msg: 'Token válido', error: false });

}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Token no válido!');
        return res.status(403).json({ msg: error.message, error: true });
    }

    usuario.password = encryptarPassword(password);
    usuario.token = '';
    await usuario.save();
    res.json({ msg: 'Contraseña actualizada correctamente', error: false });
}


module.exports = { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword }