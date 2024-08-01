const express = require('express');
require('dotenv').config();

console.log(process.env);

const app = express();

// * DIRECTORIO PUBLICO
app.use(express.static('public'));

// * RUTAS
app.use('/api/auth', require('./routes/auth'));
// todo: crud events - create, read, update, delete

// app.get('/', (req, res) => {
// 	res.json({
// 		message: 'Hello World!'
// 	});
// })

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});