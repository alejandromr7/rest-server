const { Router } = require('express');
const { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword } = require('../controllers/UsuarioController');
const router = Router();

router.post('/', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);


module.exports = router;