const express = require('express');
require('dotenv').config();
// console.log(process.env);

const { dbConnection } = require('./database/config');

// Desestructurar el puerto
// const port = process.env.PORT;
const { PORT: port } = process.env;

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
// auth: crear, login, renew
app.use('/api/auth', require('./routes/auth'));

// CRUD: Eventos

// Escuchar peticiones
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
