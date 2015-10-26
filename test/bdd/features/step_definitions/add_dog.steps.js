
'use strict';

var dogs = require('../../../../controllers/api/dogs');

//Only added as part of debugging to see why can't do mongo stuff from Cucumber, but can from Nyan
var Dog = require('../../../../models/dog');


module.exports = function(){
	
	//Pull back the dog list that would be sent to the HTML
	var retreivedDog;

	this.Given(/^I have an empty dog list$/, function (callback) {
	 
		console.log('in the Given bit');
		
	  callback();
	});
	
	this.When(/^I add a dog to the list$/, function (callback) {
		
	console.log('in the when bit');
	  // Write code here that turns the phrase above into concrete actions
	  callback();
	});
	
	this.Then(/^The dog list contains a single item$/, function (callback) {
	  // Write code here that turns the phrase above into concrete actions
	  callback.pending();
	});
	
	this.Then(/^I can access that dog from the dog list by ID$/, function (callback) {
		 
		//retreivedDog = dogs.getDogById('560942393eb825ab5d995a47');

		
		//Debugging Mongo/Cucumber stuff
		console.log("------About to get a dog from mongo");
		
		//This function never returns, there is something wrong with Cucumber/mongo stuff
		Dog.find({dogName: 'Jasper'}, function (err, dog) {
			console.log('********');
		    
		    console.log('+++' + dog);
		  });
		
		
		  callback();
	});

}