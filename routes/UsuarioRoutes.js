const { Router } = require('express');
const { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } = require('../controllers/UsuarioController');
const checkAuth = require('../middlewares/checkAuth');
const router = Router();

router.post('/', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

router.get('/perfil', checkAuth, perfil);


module.exports = router;