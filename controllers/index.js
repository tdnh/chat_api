'use strict';

// var logger = require('');
var requireAll = require('require-all');


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