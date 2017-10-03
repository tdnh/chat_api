'use strict';

var requireAll = require('require-all');
var mongoose = require('mongoose');
var config = require('config');

// config.user,pass,ip,port,db
var db = config.db;
var uri = `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.dbName}`;


mongoose.connect(uri, db.option);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = requireAll({
  dirname: __dirname,
  filter: (fileName) => {
    let name = fileName.split('.');
    if (name[0] != 'index') {
      return name[0];
    } else {
      return;
    }
  }
});
