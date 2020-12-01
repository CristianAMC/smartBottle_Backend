"use strict";

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = require('express').Router();

var userController = new _UserController.default();
routes.post('/create', (req, res) => {
  userController.register(req).then(data => {
    //Recoge la promesa resolve (se cumplio promesa)
    res.status(200).send(data);
  }).catch(error => {
    //Recoge el reject de usercontroller (error)
    res.status(error[0]).send(error[1]);
  });
});
routes.post('/login', (req, res) => {
  userController.login(req).then(token => {
    res.header('Authorization', token) //Validar token
    .json({
      error: null
    });
  }).catch(error => res.status(error[0]).send(error[1]));
});
module.exports = routes;