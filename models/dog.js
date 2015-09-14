var db = require('../db')
var Dog = db.model('Dog', {
  dogName: 			{ type: String, required: true },
  ownerFirstName:   { type: String, required: true },
  ownerLastName:    { type: String, required: true},
  dogDOB:			{ type: Date, required: true, default: Date.now },
  dogStartDate:		{ type: Date, required:false, default: Date.now},
  dogPicture:		{ type: String, required: false}  //The binary image is encoded as a string in the JSON
})
module.exports = Dog