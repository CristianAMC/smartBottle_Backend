"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function connect() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      yield mongoose.connect('mongodb+srv://CrisAMC:Cr095753@cluster0.uvvoi.mongodb.net/db1?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        resolve('DB is connected');
        return true;
      }).catch(err => reject(err));
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

module.exports = {
  connect: connect
};