const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldValidator = (req, res = response, next) => {

	// handler errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			msg: 'Validation failed',
			errors: errors.mapped()
		})
	}
		
	next();
}

module.exports = { 
	fieldValidator
};

