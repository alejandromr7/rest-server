const { Router } = require('express');
const { crearUsuario, consultar } = require('../controllers/UsuarioController');
const router = Router();

router.get('/', consultar);
router.post('/', crearUsuario);

module.exports = router;