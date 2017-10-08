'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  email: String,
  password: String,
  name: String
}, {
  timestamps: true,
  versionKey: false
});


User.pre('save', function(next) {
  this.update({}, {$set: {updateAt: new Date()}});
  return next();
});
User.pre('update', function(next) {
  this.update({}, {$set: {updateAt: new Date()}});
  return next();
});


module.exports = mongoose.model('User', User);