const { response } = require('express');

// post request
const createUser = (req, res = response) => {

	const { name, email, password } = req.body;
	
	res.status(201).json({
		ok: true,
		msg: 'User created',
		name,
		email,
		password
	});
}

// post request
const loginUser = (req, res = response) => {

	const { email, password } = req.body;
	
	res.json({
		ok: true,
		msg: 'User logged in',
		email,
		password
	});
}

// get request
const renewToken = (req, res = response) => {
	
	res.json({
		message: 'renew'
	});
}

module.exports = {
	createUser,
	loginUser,
	renewToken
}