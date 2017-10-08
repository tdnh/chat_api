'use strict';

var models = require('../models');
var messages = require('../services/messages');



class MessageController {



  create(req, res, next) {
    try {
      let message = req.body;
      if (!body.body) return next();
      let obj = {
        body: message.body,
        author: req.user._id, // userId
        room: message.room, // roomId
      };

      messages.createMessage(obj, (err, message) => {
        if (err) return next(err);
        return res.status(200).json(message);
      });
    } catch (error) {
      return next(error);
    }
  }

  getMessageInRoom(req, res, next) {
    try {
      let idRoom = req.params.id;
      let limit = req.query.limit || 20;
      let offset = req.params.offset || 0;
      models['Message'].find({room: idRoom})
      .sort('-createdAt')
      .limit(limit)
      .offset(offset)
      .populate({
        path: 'User',
        select: 'author.name, author._id'
      })
      .lean()
      .exec((err, messages) => {
        if (err) return next(err);
        return res.status(200).json(messages);
      });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  update(req, res, next) {
    try {
      return next();
    } catch (error) {
      return next(error)
    }
  }

  delete(req, res, next) {
    try {
      return next();
    } catch (error) {
      return next(error)
    }
  }
}



module.exports = new MessageController();