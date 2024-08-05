const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./database/config');

const app = express();

// * BASE DE DATOS
connectDB();

// * CORS
app.use(cors());

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