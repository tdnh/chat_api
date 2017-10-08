'use strict';

var _ = require('lodash');
var models = require('../models');



function createMessage(params, cb) {
  let input = _.pick(params, ['body','author','room']);
  models['Message'].create(input, (err, message) => {
    // console.log(err);
    // console.log('new message ',message);
    // if (err) return cb(err);
    // return cb(err, message)
    message.populate('author', (err, messg) => {
      console.log(err);
      console.log('new message ',message);
      if (err) return cb(err);
      return cb(err, messg);
    });
  });
}









module.exports = {
  createMessage
}