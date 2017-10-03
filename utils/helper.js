'use stric';

var jwt = require('jsonwebtoken');
var config = require('config');
var crypto = require('crypto');
var fs = require('fs');



function hasPass(pass) {
  try {
    if (!pass) {
      console.log('password input is ', pass);
      return null;
    }
    let password = 
      crypto.createHmac('sha256', config.secret)
            .update(pass)
            .digest('hex');  
    return password;
  } catch (error) {
    console.log(error);
    return null;
  }
};


function generateToken(id) {
  // const secret = fs.readFileSync(__dirname + '/private.key');
  let token = jwt.sign({ id: id }, config.secretKey, {
    algorithm: 'HS256',
    expiresIn: '5 days'
  });
  return token;
};

function verifyToken(token) {
  var decoded = jwt.verify(token, config.secretKey);
  return decoded;
}






module.exports = {
  hasPass,
  generateToken,
  verifyToken
}