'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('../utils/constants');

const Room = new Schema({
  name: String,
  password: String,
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  roomType: { type: Number, default: constant.ROOM.TYPE.ANONYMOUS },
  status: { type: Number, default: constant.ROOM.STATUS.NEW },
}, {
    timestamps: true,
    versionKey: false
  });


Room.pre('save', function (next) {
  this.update({}, { $set: { updateAt: new Date() } });
  return next();
});
Room.pre('update', function (next) {
  this.update({}, { $set: { updateAt: new Date() } });
  return next();
});




module.exports = mongoose.model('Room', Room);