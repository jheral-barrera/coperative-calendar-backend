const { response } = require('express');

const createUser = (req, res = response) => {

	res.json({
		message: 'register'
	});
}

const loginUser = (req, res) => {
	
	res.json({
		message: 'login'
	});
}

const renewToken = (req, res) => {
	
	res.json({
		message: 'renew'
	});
}

module.exports = {
	createUser,
	loginUser,
	renewToken
}