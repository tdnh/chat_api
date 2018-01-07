'use strict';

var _ = require('lodash');
var models = require('../models');



function getDetail(id, cb) {
  models['User'].findOne({_id: id}, (err, user) => {
    if (err) return cb(err);
    return cb(null, user);
  });
}


module.exports = {
  getDetail
}