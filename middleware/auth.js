'use strict';

var jwt = require('jsonwebtoken');
var config = require('config');
var helper = require('../utils/helper');
var models = require('../models');

module.exports = (req, res, next) => {
  if (req.path == '/rooms/anonymous') {
    return next();
  }
  let p = req.path.split('/');
  if (p[p.length - 1] == 'login' || p[p.length - 1] == 'users') {
    if (req.method == 'POST') {
      return next();
    }
  }
  // get token
  let token = req.headers['x-auth-token'];
  if (!token) {
    return next({ code: 400, message: 'token error' });
  }

  let decode = helper.verifyToken(token);
  if (decode.id) {
    models['User'].find({ _id: decode.id }, (err, user) => {
      if (err) return next(err);
      req.user = user[0];
      return next();
    });
  }
  else {
    return res.json({ code: 400, message: 'token error' });
  }
}