const routes = require('express').Router();
const measureController = require('../controllers/Measurement')
const controller = new measureController();

routes.post('/save', (req, res)=> {
    controller.save(req)
    .then(data => res.send(200).send(data))
    .catch(error => res.status(error[0]).send(error[1]))
})
routes.get('/get', (req, res)=> {
    controller.get()
    .then(data => res.status(200).send(data))
    .catch(error => res.status(error[0]).send(error[1]))
})
routes.get('/find-by-botilito', (req, res)=> {
    controller.findByBotilito(req)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(error[0]).send(error[1]))

})

module.exports = routes;