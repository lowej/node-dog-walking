var db = require('../db')
var Dog = db.model('Dog', {
  dogName: 			{ type: String, required: true },
  ownerFirstName:   { type: String, required: true },
  ownerLastName:    { type: String, required: true},
  dogDOB:			{ type: Date, required: true, default: Date.now }
})
module.exports = Dog