const  mooongose = require('mongoose')
const schema = mooongose.Schema ;
const measurementSchema = new schema({
    id_botilito : {
        type: String
    }, 
    TempEsp : { 
        type: Number 
    },
    Ax: Number,
    Ay: Number, 
    Az: Number ,
    VoltajeBateria: Number,
    VoltajeCircuito: Number,
    bmp: Number, 
    oximetry: Number 
})
const measurementModel = mooongose.model('measurements', measurementSchema);

module.exports = measurementModel;