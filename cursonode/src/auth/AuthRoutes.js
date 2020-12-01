import UserController from '../controllers/UserController'; 
const routes = require('express').Router()
const userController = new UserController();

routes.post('/create', (req, res) => {
    userController.register(req)
        .then( data=> { //Recoge la promesa resolve (se cumplio promesa)
            res.status(200).send(data)
        })
        .catch(error => { //Recoge el reject de usercontroller (error)
            res.status(error[0]).send(error[1])
        })
})

routes.post('/login', (req, res )=> {
    userController.login(req)
    .then(token => {
        res.header('Authorization', token) //Validar token
        .json({error: null})      
    })
    .catch(error => res.status(error[0]).send(error[1]))
})


module.exports = routes;