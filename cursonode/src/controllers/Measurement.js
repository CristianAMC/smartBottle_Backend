const { resolve } = require('path')
const measurementModel = require('../database/models/Measurement')
 class Measurement{
    
    /**
     * 
     * @param {request} req
     * this method is for saving a measure 
     */
    save(req){
        return new Promise((resolve, reject)=> {
            if(Object.keys(req.body).length === 0){
                reject([400, {error: 'no data found'}])
            }
            const Measurement = new measurementModel({
                id_botilito : req.body.id_botilito,
                TempEsp : req.body.TempEsp,
                Ax: req.body.Ax,
                Ay: req.body.Ay,
                Az: req.body.Az ,
                VoltajeBateria: req.body.VoltajeBateria,
                VoltajeCircuito: req.body.VoltajeCircuito,
                bmp: req.body.bmp, 
                oximetry: req.body.oximetry
            })
            try {
                const measurSaved = Measurement.save().then(res => res)
                resolve(measurSaved);
            } catch (error) {
                reject([500, {error: error}])
            }
        })
    }
    /**
     * This method obtains all measure  saved in db
     */
    get(){
        return new Promise((resolve, reject)=> {
            measurementModel.find({})
            .then(res => resolve(res))
            .catch(error => reject([500, {err: error }]))
        })
    }

    /**
     * 
     * @param {request} req
     * this method obtains the url query called 'botilito'
     * and filter register by this parameter 
     */
    findByBotilito(req){
        return new Promise((resolve, reject)=> {
            const id_botilito = req.query.botilito; 
            measurementModel.find({id_botilito: id_botilito})
            .then(data => resolve(data))
            .catch(error => reject([500, {error: error }]))
        })
    } 
}

module.exports = Measurement;