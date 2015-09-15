/////////////////////////////////
//Tests for Node.  I.e. testing the business services
/////////////////////////////////

var expect = require('chai').expect
var ctrl = require('../../../../controllers/api/dogs')


var api = require('../../support/api')

//Currently just setup harness.  Checks that the api exists
describe('controllers.api.dogs', function () {
  it('exists', function () {
    expect(ctrl).to.exist;
  })
})



//Call the Node RESTful API passing the dogName wanted
//Should be refactored to pull back dog by ID, not name
describe('GET /dog', function () {

  it('responds with a single, and correct dog', function (done) {
	  //Lazy way of calling the API, should be a way of programatically adding the query param
      api.get('/api/dog?dogNameParam=Florence')
      .expect(200)
      .expect(function (response) {
    	//Check that the dog name matches
        expect(response.body.dogName).to.equal("Florence");
        
        //Check that owner name matches
        expect(response.body.ownerFirstName).to.equal("Fiona");
      })
      .end(done)
    })
  
})