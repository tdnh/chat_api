'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
  name: String,
  password: String,
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  status: { type: Number, default: 1 }
}, {
  timestamps: true,
  versionKey:false
});


Room.pre('save', function(next) {
  this.update({}, {$set: {updateAt: new Date()}});
  return next();
});
Room.pre('update', function(next) {
  this.update({}, {$set: {updateAt: new Date()}});
  return next();
});




module.exports = mongoose.model('Room', Room);