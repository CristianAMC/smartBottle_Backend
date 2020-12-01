const mongoose = require('mongoose') //Creacion de modelo //Nos permite darle orden y que sea estrictamente necsario llenar el dato requerido,
// tambien ayuda a que no se repitan correos,etc
const Schema = mongoose.Schema; 

const userSchema = new Schema({
    login: { //user
        type: String,
        required: true, 
        unique: true
    },
    email : {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true, 
        unique: true
    },
    name: {
        type: String,
        required:true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    numberB: {
        type: String,
        required: false,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        unique: false
    },
    gender: {
        type: String,
        required: true,
        unique: false
    },
    diseases: {
        type: Array,
        required: true,
        unique: false
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }, 
    resetKey: {
        type: String
    }
}); 

const userModel = mongoose.model('Users', userSchema); //Creacion modelo
module.exports = userModel; 