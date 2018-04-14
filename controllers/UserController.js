'use strict';

// var config = require('config');
// var crypto = require('crypto');
var _ = require('lodash');
var models = require('../models');
var helper = require('../utils/helper');
const UserService = require('../services/user');
const uuidv4 = require('uuid/v4');



class UserController {

  create(req, res, next) {
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
        return res.status(200).json(user);
      });
    } catch (error) {
      return next(error);
    }
  }

  createAnonymousUser(req, res, next) {
    try {
      let name = uuidv4();
      let obj = { name, email: `${name}@tnh.com` };
      UserService.createAnonymous(obj)
        .then(user => {
          return res.status(200).json(user);
        })
        .catch(e => {
          return next(e);
        });
    } catch (error) {
      return next(error);
    }
  }

  login(req, res, next) {
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
        if (!user.length) return next();
        console.log(user[0]);
        let resp = _.pick(user[0], ['_id', 'email', 'name']);
        resp.token = helper.generateToken(resp._id);
        return res.status(200).json({ code: 200, resp });
      });

    } catch (error) {
      return next(error);
    }
  }



  detail(req, res, next) {
    try {
      // let id = req.query.id;
      // models['User'].findOne({_id: ''}, (err, user) => {
      //   if (err) return next(err);
      //   return next();
      // })
      return next();
    } catch (error) {
      return next(error);
    }
  }
}



module.exports = new UserController();