var db = require('../db');

var Dog = db.model('Dog', {
  dogName: 			{ type: String, required: true },
  ownerFirstName:   { type: String, required: true },
  ownerLastName:    { type: String, required: true},
  dogBreed:    		{ type: String, required: false},
  hourlyRate:  		{ type: Number, required: false, default: 0.0},
  dogDOB:			{ type: Date, required: false, default: Date.now },
  dogStartDate:		{ type: Date, required: false, default: Date.now},
  dogPicture:		{ type: String, required: false},  //The binary image is encoded as a string in the JSON
  walks: 			{
	 walkArray:	[
	           	 {
	           		 walkDate: {type: Date},
	           		 walkTime: {type: String}
	           	 }
	           	 ]
  }
})
module.exports = Dog