const alertsModel  =require('../database/models/Alerts')

class AlertController{ 
    getAlets(){
        return new Promise((resolve, reject)=> {
            alertsModel.default.find((err, res)=> {
                if(err){
                    reject([500, {error: err}])
                }
                resolve(res);
            })
        })
    }
}