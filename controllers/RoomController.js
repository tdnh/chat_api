'use strict';

var models = require('../models');



class UserController {



  create (req, res, next) {
    try {
      let body = req.body;
      if (!body.name) return next();
      let obj = {
        name: body.name,
        admin: req.user._id,
        users: [req.user._id],
      }

      models['Room'].create(obj, (err, room) => {
        if (err) return next(err);
        return res.json(room);
      });
    } catch (error) {
      return next(error);
    }
  }

  update (req, res, next) {
    try {
      return next();
    } catch (error) {
      return next(error)
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