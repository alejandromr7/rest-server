

const crearUsuario = async (req, res) => {
    const body = req.body;
    res.json({ msg: 'Welcome to Jamaica!', usuario: body });
}

module.exports = { crearUsuario }