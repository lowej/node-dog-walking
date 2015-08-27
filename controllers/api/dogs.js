
//Node controller for serving up the business services to presentation tier

var Dog = require('../../models/dog')
var router = require('express').Router()

//Allows dogs to be returned - HTTP GET REQUEST
router.get('/api/dogs', function (req, res, next) {
 
	Dog.find(function(err, dog){
		if(err){return next(err)}
		res.json(dog)
	})
})


//Allows a new dog to be created - HTTP POST REQUEST
router.post('/api/dog', function(req, res, next){
	var dog = new Dog({
		dogName: req.body.dogName,
		ownerFirstName: req.body.ownerFirstName,
		ownerLastName: req.body.ownerLastName,
		dogDOB: req.body.dogDOB
	})
	
	dog.save(function(err, dog){
		if(err) {return next(err)}
		
		console.log('post received');
		console.log(req.body.dogName)
		console.log(req.body.ownerFirstName)
		res.status(201).json(dog)
	})
})

module.exports = router