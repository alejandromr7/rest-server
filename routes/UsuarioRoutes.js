const { Router } = require('express');
const { registrar } = require('../controllers/UsuarioController');
const router = Router();

//router.get('/', consultar);
router.post('/', registrar);

module.exports = router;