"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var router = require('express').Router();

var jwt = require('jsonwebtoken');

router.use((req, res, next) => {
  var token = req.headers['authorization'];

  if (!token || token == undefined || token == null) {
    return res.status(401).send({
      error: "Unauthorized, not token found"
    });
  } else if (token) {
    jwt.verify(token, '1006361228', (err, decoded) => {
      if (err) {
        return res.status(401).send({
          error: 'Invalid token'
        });
      } else {
        next();
      }
    });
  }
});
var _default = router;
exports.default = _default;