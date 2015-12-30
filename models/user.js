//Holds users objects for authenticating access

var db = require('../db')
var user = db.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false}
})
module.exports = db.model('User', user);

//Code below is the basic auth demo using the server-auth.js file
//var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/auth_demo')
//
//var user = mongoose.Schema({
//  username: String,
//  password: String
//})
//
//module.exports = mongoose.model('User', user)