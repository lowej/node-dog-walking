
//Grab the user's information from the JWT.  
//The middleware will attach an auth object to the requests for you to look up the current user's info.

var jwt = require('jwt-simple');
var config = require('./config');

module.exports = function (req, res, next) {
  if (req.headers['x-auth']) {
    req.auth = jwt.decode(req.headers['x-auth'], config.secret)
  }
  next();
}