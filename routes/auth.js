/*
	Rutas de autenticación de usuarios
	host + /api/auth
*/

const { Router } = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const router = Router();

router.post('/', loginUser)

router.post('/register', createUser);

router.get('/renew', renewToken);

module.exports = router;
