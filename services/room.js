'use strict';


module.exports = (() => {

  const models = require('../models');
  

  async function create({name,users}) {
    try {
      return await models.Room.create({name, users});
    } catch (error) {
      throw error;
    }
  }


  return {
    create
  }
})();