'use strict';

const setCookies = require('./set_cookies');
const auth = require('./auth');




module.exports = [
  setCookies,
  auth
]