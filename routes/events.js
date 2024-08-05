/* 
	* RUTAS DE EVENTOS
	* host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { isDate } = require('../helpers/isDate');

const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Middleware aplicado a todas las rutas
router.use( jwtValidator );

router.get('/', getEvent);

router.post(
	'/', 
	[
		check('title', 'Title is required').not().isEmpty(),
		check('start', 'Start date is required').custom( isDate ),
		check('end', 'End date is required').custom( isDate ),
		fieldValidator
	],
	createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;