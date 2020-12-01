const userRepository  = require('../database/models/UserModel')
const bcrypt = require('bcrypt') //HASH
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
class UserController{

    register = (req)=> {
        return new Promise(async(resolve, reject)=> { //Promesa = Esperar, Correr la funcion en segundo plano = async
            if(Object.keys(req.body).length === 0){ //Si encuentra cuerpo vacio //req.body = object
                reject([400, {error: 'No body found'}])
            }
           
            //var == let

            let  existUser = await userRepository.findOne({email: req.body.email}).then(res => res); //Comprobar email
            if(existUser) reject([400, {error: 'This email already exist'}]);

            existUser = await userRepository.findOne({login: req.body.login}).then(res => res); //Comprobar usuario "login"
            if(existUser) reject([400, {error: 'This login already exist'}]) ;

            const salt = await  bcrypt.genSalt(12) //Encriptar 12 veces
            const passwordHash = await bcrypt.hash(req.body.password, salt) //HASH
            
            const user = new userRepository({
                login: req.body.login,
                email: req.body.email,
                password: passwordHash,
                name: req.body.name,
                lastName: req.body.lastName,
                numberB: req.body.numberB,
                age: req.body.age,
                gender: req.body.gender,
                diseases: req.body.diseases,
                resetKey: passwordHash
            })
            
            try {
                const savedUser = await user.save() //Guardar usuario
                resolve(savedUser)//Se cumple la promesa
            } catch (error) {
                reject([500, {error: error}])
            }

        })
    }

    login(req){
        return new Promise(async(resolve, reject) => {
            const schemaLogin = Joi.object({
                email: Joi.string().required().email(), 
                password: Joi.string().max(20).min(8).required()
            }); 

            const {error} = schemaLogin.validate(req.body)
            if(error) reject([400, {error : error}]);

            const userFound = await userRepository.findOne({email: req.body.email})
            if(!userFound) reject([404, {error: 'User was not fount with that email'}]); 

            const compare =  await bcrypt.compare(req.body.password, userFound.password); //Comparar contraseña
            if(!compare) reject([400, {error: 'Password incorect'}]); 

            const token = jwt.sign({ //Construcción token
                email: userFound.email, 
                login: userFound.login, 
                id : userFound._id
            }, process.env.SECRET_KEY || '1006361228', {expiresIn: 3600})

            resolve(token)

        })
    }

}


module.exports = UserController;