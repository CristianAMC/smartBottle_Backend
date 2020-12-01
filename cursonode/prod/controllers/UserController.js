"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userRepository = require('../database/models/UserModel');

var bcrypt = require('bcrypt'); //HASH


var Joi = require('@hapi/joi');

var jwt = require('jsonwebtoken');

class UserController {
  register(req) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (resolve, reject) {
        //Promesa = Esperar, Correr la funcion en segundo plano = async
        if (Object.keys(req.body).length === 0) {
          //Si encuentra cuerpo vacio //req.body = object
          reject([400, {
            error: 'No body found'
          }]);
        } //var == let


        var existUser = yield userRepository.findOne({
          email: req.body.email
        }).then(res => res); //Comprobar email

        if (existUser) reject([400, {
          error: 'This email already exist'
        }]);
        existUser = yield userRepository.findOne({
          login: req.body.login
        }).then(res => res); //Comprobar usuario "login"

        if (existUser) reject([400, {
          error: 'This login already exist'
        }]);
        var salt = yield bcrypt.genSalt(12); //Encriptar 12 veces

        var passwordHash = yield bcrypt.hash(req.body.password, salt); //HASH

        var user = new userRepository({
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
        });

        try {
          var savedUser = yield user.save(); //Guardar usuario

          resolve(savedUser); //Se cumple la promesa
        } catch (error) {
          reject([500, {
            error: error
          }]);
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  login(req) {
    return new Promise( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (resolve, reject) {
        var schemaLogin = Joi.object({
          email: Joi.string().required().email(),
          password: Joi.string().max(20).min(8).required()
        });
        var {
          error
        } = schemaLogin.validate(req.body);
        if (error) reject([400, {
          error: error
        }]);
        var userFound = yield userRepository.findOne({
          email: req.body.email
        });
        if (!userFound) reject([404, {
          error: 'User was not fount with that email'
        }]);
        var compare = yield bcrypt.compare(req.body.password, userFound.password); //Comparar contraseña

        if (!compare) reject([400, {
          error: 'Password incorect'
        }]);
        var token = jwt.sign({
          //Construcción token
          email: userFound.email,
          login: userFound.login,
          id: userFound._id
        }, process.env.SECRET_KEY || '1006361228', {
          expiresIn: 3600
        });
        resolve(token);
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  }

}

module.exports = UserController;