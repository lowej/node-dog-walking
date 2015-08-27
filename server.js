var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var Dog = require('./models/dog')


app.use(bodyParser.json())

//Serve the services to angular
app.use(require('./controllers/api/dogs'))

//Serve the main html page
app.use(require('./controllers/static'))
 
//Start the Express HTTP server
app.listen(3000, function () {
  console.log('Server listening on', 3000)
})