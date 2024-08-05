/*
	Rutas de autenticación de usuarios
	host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');

router.post(
	'/', 
	[
		check('email', 'The email is not correct').isEmail(),
		check('password', 'Incorrect password').not().isEmpty(),
		fieldValidator
	],
	loginUser
)

router.post(
	'/register', 
	[ // Middleware
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'The email is not correct').isEmail(),
		check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
		fieldValidator
	], 
	createUser
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
