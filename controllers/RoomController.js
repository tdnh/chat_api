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
        room.populate('admin').populate('users').exec((err, roomInfo) => {
          if (err) return next(err);
          return res.status(200).json(roomInfo);
        });
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

  getLists(req, res, next) {
    try {
      let query = {};
      if (req.query.id) {
        query = { _id: req.query.id };
      }
      models['Room'].find(query).populate('admin').populate('users').exec((err, rooms) => {
        if (err) return next(err);
        return res.status(200).json(rooms);
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