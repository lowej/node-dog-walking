/////////////////////////////////
//Tests for Node.  I.e. testing the business services
/////////////////////////////////

var expect = require('chai').expect
var ctrl = require('../../../../controllers/api/dogs')

//Currently just setup harness.  Checks that the api exists
describe('controllers.api.dogs', function () {
  it('exists', function () {
    expect(ctrl).to.exist;
  })
})