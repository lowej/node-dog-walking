var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dogwalking', function () {
  console.log('mongodb connected')
})
module.exports = mongoose