'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
  body: String,
  seen: Boolean,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  room: { type: Schema.Types.ObjectId, ref: 'Room' }
}, {
  timestamps: true,
  versionKey: false
});


Message.pre('save', function(next) {
  this.update({}, {$set: {updateAt: new Date()}});
  return next();
});
Message.pre('update', function(next) {
  this.update({}, {$set: {updateAt: new Date()}});
  return next();
});

module.exports = mongoose.model('Message', Message);