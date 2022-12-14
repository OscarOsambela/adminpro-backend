const express = require("express");
const { dbConection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

//crear el servidor de express
const app = express();
//configurar CORS
app.use(cors())
//lectura y parseo del body
app.use(express.json())

dbConection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/hospitales', require('./routes/hospitales'))
app.use('/api/medicos', require('./routes/medicos'))
app.use('/api/todo', require('./routes/busquedas'))



app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});

//mongodb compass user & pass : main_user
//cadena conexion: mongodb+srv://main_user:*****@cluster0.gnbit.mongodb.net/hospitaldb
