'use strict';

module.exports = (() => {


  const _ = require('lodash');
  const models = require('../models');



  function getDetail(_id, cb) {
    try {
      return models.User.findOne({ _id }, cb);
    } catch (error) {
      throw error;
    }
  }

  async function getDetailByName(name) {
    try {
      return await models.User.findOne({ name });
    } catch (error) {
      throw error;
    }
  }

  async function createAnonymous(user) {
    try {
      return await models.User.create(user);
    } catch (error) {
      throw error;
    }
  }

  return {
    getDetail,
    getDetailByName,
    createAnonymous
  }
})();