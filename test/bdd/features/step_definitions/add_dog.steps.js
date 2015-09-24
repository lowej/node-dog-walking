
'use strict';

var dogs = require('../../../../controllers/api/dogs');


module.exports = function(){
	
	//Pull back the dog list that would be sent to the HTML
	var dogList;

	this.Given(/^I have an empty dog list$/, function (callback) {
	 
		dogList = dogs.getList();
		
	  callback.pending();
	});
	
	this.When(/^I add a dog to the list$/, function (callback) {
	  // Write code here that turns the phrase above into concrete actions
	  callback.pending();
	});
	
	this.Then(/^The dog list contains a single item$/, function (callback) {
	  // Write code here that turns the phrase above into concrete actions
	  callback.pending();
	});
	
	this.Then(/^I can access that dog from the dog list$/, function (callback) {
	  // Write code here that turns the phrase above into concrete actions
	  callback.pending();
	});

}