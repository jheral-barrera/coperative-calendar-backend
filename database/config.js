const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		mongoose.connect(process.env.DB_CONNECTION);

		console.log('MongoDB connected');

	} catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	connectDB
}