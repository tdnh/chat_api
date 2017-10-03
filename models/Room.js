'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
  name: String,
  password: String,
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  status: { type: Number, default: 1 },
  ctime: { type: Date, default: Date.now },
  utime: { type: Date, default: Date.now }
});




module.exports = mongoose.model('Room', Room);