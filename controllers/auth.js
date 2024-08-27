const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user-model');

const { generateJWT } = require('../helpers/jwt');

// post request
const createUser = async (req, res = response) => {

	const { email, password } = req.body;

	try {

		let user = await User.findOne({ email });

		if ( user ) return res.status(400).json({
			ok: false,
			msg: 'User with this email already exists'
		});

		user = new User( req.body );

		// * Encriptar la contraseña
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(user.password, salt);

		await user.save();

		// * Generar json web token
		const token = await generateJWT(user._id, user.name);
		
		res.status(201).json({
			ok: true,
			msg: 'User created',
			_id: user._id,
			name: user.name,
			token
		});

	} catch (error) {

		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error from server.'
		});

	}
}

// post request
const loginUser = async (req, res = response) => {

	const { email, password } = req.body;

	try {
		
		const user = await User.findOne({ email });

		if ( !user ) return res.status(400).json({
			ok: false,
			msg: 'User not found with this email'
		});

		// * Confirmar la contraseña
		const validPassword = bcrypt.compareSync(password, user.password);

		if ( !validPassword ) return res.status(400).json({
			ok: false,
			msg: 'Invalid password'
		});

		// * Generar json web token
		const token = await generateJWT(user._id, user.name);

		res.status(200).json({
			ok: true,
			msg: 'User logged in',
			_id: user._id,
			name: user.name,
			password,
			token
		});
		
	} catch (error) {

		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error from server.'
		});

	}
	
}

// delete request
const deleteUser = async (req, res = response) => {
	const { userId } = req.params.id;

	try {

		const user = await User.findByIdAndDelete(userId);

		res.status(200).json({
			ok: true,
			msg: 'User deleted',
			name: user.name,
			email: user.email,
		});


	} catch (error) {

		console.log(error);
		return res.status(400).json({
			ok: false,
			msg: 'Error deletening user',
			error
		});
	}
}

// get request
const renewToken = async (req, res = response) => {

	const { uid, name } = req;

	// * Actualizar el token
	const token = await generateJWT(uid, name);

	res.status(200).json({
		ok: true,
		uid,
		name,
		token
	});
}

module.exports = {
	createUser,
	loginUser,
	deleteUser,
	renewToken
}