const mongoose = require('mongoose')

mongoose.Promise = global.Promise
function  connect() {
    return new Promise(async(resolve, reject)=> {
        await mongoose.connect('mongodb+srv://CrisAMC:Cr095753@cluster0.uvvoi.mongodb.net/db1?retryWrites=true&w=majority', { 
            useNewUrlParser: true,
            useUnifiedTopology: true  
        })
        .then( () => {
            resolve('DB is connected')
            return true;
        })
        .catch( err => reject(err))
    } )
}

module.exports = {
     connect: connect
}