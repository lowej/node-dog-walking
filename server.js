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
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server listening on', port);
})