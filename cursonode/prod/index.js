"use strict";

var express = require('express');

var cors = require('cors');

var app = express(); //const path = require('path')

var bodyParser = require('body-parser');

var db = require('./database/db');

var userRoutes = require('./routes/UserRoutes');

app.use(cors({
  exposedHeaders: 'Authorization'
}));
app.set('PORT', 4000); //Guarda datos en memoria (LLAVE, VALOR)

app.use(bodyParser.json()); //Todas las peticiones se transforman en json

app.use(bodyParser.urlencoded({
  extended: false
})); //Recibir url complejas

app.get('/', (request, response) => {
  response.status(200).sendFile(path.join(__dirname, 'index.html'));
});
app.use('/api/user', userRoutes); //UTILIZAR RUTA USERROUTES (API)

var server = app.listen(app.get('PORT'), () => {
  //Nos "devuelve" un servidor en la constante server, Crear server
  console.log("App   on  port ".concat(app.get('PORT')));
  db.connect().then(res => console.log(res)).catch(error => console.log(error));
});