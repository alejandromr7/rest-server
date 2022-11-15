const { Router } = require('express');
const { registrar, autenticar, confirmar, olvidePassword, comprobarToken } = require('../controllers/UsuarioController');
const router = Router();

router.post('/', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);

module.exports = router;