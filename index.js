const express = require('express');
require('dotenv').config();

const app = express();

// * DIRECTORIO PUBLICO
app.use(express.static('public'));

// * MIDDLEWARES
// Lectura y transformacion de datos del body
app.use(express.json()); 

// * RUTAS
app.use('/api/auth', require('./routes/auth'));
// todo: crud events - create, read, update, delete

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});