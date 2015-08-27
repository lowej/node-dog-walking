var express = require('express')
var router = express.Router()


//Ensures the angular javascript is served up
router.use(express.static(__dirname + '/../assets'))

//Allows the HTML to be served when hitting root context
router.get('/', function (req, res) {
  res.sendfile('layouts/dogList.html')
})

module.exports = router