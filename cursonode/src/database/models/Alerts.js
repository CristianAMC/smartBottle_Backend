const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const alertSchema = new Schema({
    name: String,
    date: Date,
    description: String
})



const alertModel = mongoose.model('alerts', alertSchema); 


export default alertModel; 