'use strict';

// var config = require('config');
// var crypto = require('crypto');
var models = require('../models');
var helper = require('../utils/helper');



class UserController {



  create (req, res, next) {
    try {
      let body = req.body;
      if (!body.email || !body.password || !body.name) return next();

      let password = helper.hasPass(body.password);
      if (!password) return next();
      let obj = {
        email: body.email,
        password: password,
        name: body.name
      };
      models['User'].create(obj, (err, user) => {
        if (err) return next(err);
        return res.json(user);
      });
    } catch (error) {
      return next(error);
    }
  }

  login (req, res, next) {
    try {
      let body = req.body;
      if (!body.email || !body.password) return next();

      let password = helper.hasPass(body.password);
      if (!password) return next();
      let obj = {
        email: body.email,
        password: password
      }
      models['User'].find(obj, (err, user) => {
        if (err) return next(err);
        console.log(user[0]._id);
        let token = helper.generateToken(user[0]._id);
        return res.json({ code: 200, token});
      });

    } catch (error) {
      return next(error);
    }
  }



  detail (req, res, next) {
    try {
      return next();
    } catch (error) {
      return next(error);
    }
  }
}



module.exports = new UserController();