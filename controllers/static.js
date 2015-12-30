var express = require('express')
var router = express.Router()


//Ensures the angular javascript is served up
router.use(express.static(__dirname + '/../assets'))

router.use(express.static(__dirname + '/../layouts'))

//AUTHENTICATION CHANGES - Added this route and created the templates dir.  Moved html and jpg to templates dir
router.use(express.static(__dirname + '/../templates'))

//Allows the HTML to be served when hitting root context
router.get('/', function (req, res) {
 // res.sendfile('layouts/dogList.html')
	res.sendfile('layouts/app.html')
	
})

//Temporary context I've created to allow creation page to be served while developing.
//Will be replaced by wrapping in an overall App context which then has a link to the creation
//function
router.get('/createDog', function (req, res) {
	//AUTHENTICATION CHANGES - CHANGED FROM layouts/dogCreation.html to templates/dogCreation.html
  res.sendfile('templates/dogCreation.html')
})

module.exports = router