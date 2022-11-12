const { Router } = require('express');
const { crearUsuario } = require('../controllers/UsuarioController');
const router = Router();

router.post('/', crearUsuario);

module.exports = router;