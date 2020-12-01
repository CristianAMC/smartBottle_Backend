import jwt_middleware  from './middleware/auth-jwt'
const express = require('express')
const cors = require('cors')
const app  = express(); 
const server = require('http').Server(app)
const socket = require('./socket')
const bodyParser = require('body-parser')
const db  = require('./database/db')

const userRoutes = require('./routes/UserRoutes') 
const authRoutes = require('./auth/AuthRoutes')

app.use(cors({
    exposedHeaders: 'Authorization'
}))

app.set('PORT', 4000); //Guarda datos en memoria (LLAVE, VALOR)
app.use(bodyParser.json())//Todas las peticiones se transforman en json
app.use(bodyParser.urlencoded({extended: false}))//Recibir url complejas
app.use('/api/auth', authRoutes)
app.use('/api/user' , jwt_middleware, userRoutes) //UTILIZAR RUTA USERROUTES (API)



server.listen(app.get('PORT'), ()=> { //Nos "devuelve" un servidor en la constante server, Crear server
    console.log(`App   on  port ${app.get('PORT')}`)
    db.connect()
    .then(res => console.log(res))
    .catch(error =>  console.log(error)); 

    socket.connect(server)
})
