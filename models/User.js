'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  email: String,
  password: String,
  name: String,
  ctime: { type: Date, default: Date.now },
  utime: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', User);