const { Router } = require('express');
const { registrar, autenticar } = require('../controllers/UsuarioController');
const router = Router();

router.post('/', registrar);
router.post('/login', autenticar);

module.exports = router;