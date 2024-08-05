const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req, res = response, next) => {

	// * x-token hearders
	const token = req.headers['x-token'];

	if ( !token) return res.status(401).json({
		ok: false,
		message: 'No token provided'
	});

	try {

		const { uid, name } = jwt.verify(
			token,
			process.env.SECRET_JWT_SEED
		);

		req.uid = uid;
		req.name = name;

	} catch (error) {

		return res.status(401).json({
			ok: false,
			message: 'Invalid token'
		});

	}

	next();
};

module.exports = {
	jwtValidator
};
