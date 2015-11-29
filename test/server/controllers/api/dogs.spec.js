/////////////////////////////////
//Tests for Node.  I.e. testing the business services
/////////////////////////////////

var expect = require('chai').expect
var ctrl = require('../../../../controllers/api/dogs');
var Dog = require('../../../../models/dog');


var api = require('../../support/api')

//Currently just setup harness.  Checks that the api exists
describe('controllers.api.dogs', function () {
  it('exists', function () {
    expect(ctrl).to.exist;
  })
})


var globalDog;

//Currently just setup harness.  Checks that the api exists
describe('controllers.api.dogs - test get by ID function', function () {
 
	beforeEach(function (done) {
	      var dogs = [
	        {dogName: 'Florence', 
	        	ownerFirstName: 'Jimmy',
	        	ownerLastName: 'Hill',
	        	dogDOB: '01-02-2010',
	        	dogStartDate: '12-03-2014',
	        	dogPicture: dogPic },
	        	{dogName: 'Jasper', 
		        	ownerFirstName: 'Billy',
		        	ownerLastName: 'TwoRivers',
		        	dogDOB: '01-01-2011',
		        	dogStartDate: '10-10-2013'}
	      ]
	      Dog.create(dogs, done);
	          
	    })
	
	
	    
	    
	it('responds with a dog by a specific ID', function(){
		
		var dogId = 1234;
		
		console.log("BEFORE function call: " + globalDog);
		
		ctrl.getDogById(dogId);
		
		//Uh Oh - the callback inside the function above has not been called before we get here
		console.log("AFTER function call: " + globalDog);
		//expect(globalDog).to.not.be.undefined;
		
		
		

	})
})





//Clear the database before starting the tests - use direct DB access to do this
describe('controllers.api.dogs', function () {
  beforeEach(function(done){
	 Dog.remove({}, done); 
  })
  

	//Call the Node RESTful API passing the dogName wanted
	//Should be refactored to pull back dog by ID, not name
	describe('GET /dog', function () {
		
	//Add some test dogs to the database, including a dog called "Florence"
	beforeEach(function (done) {
	      var dogs = [
	        {dogName: 'Florence', 
	        	ownerFirstName: 'Jimmy',
	        	ownerLastName: 'Hill',
	        	dogDOB: '01-02-2010',
	        	dogStartDate: '12-03-2014',
	        	dogPicture: dogPic },
        	{dogName: 'Jasper', 
	        	ownerFirstName: 'Billy',
	        	ownerLastName: 'TwoRivers',
	        	dogDOB: '01-01-2011',
	        	dogStartDate: '10-10-2013',
	        	walks: {
	        		walkArray: [
	        		           {
	        		        	   walkDate: '10-01-2015',
	        		        	   walkTime: '30'
	        		           	},
	        		        	{
	        		        		walkDate: '10-02-2015',
		        		        	walkTime: '60'
	        		        	}
	        		           ]
	        		
	        	}}
	      ]
	      Dog.create(dogs, done);
	            
	      
	    })
	    
	    
	    
	  it('responds with a single, and correct dog when searched with name', function (done) {
		  
		  
		  //Lazy way of calling the API, should be a way of programatically adding the query param
	      api.get('/api/dog?dogNameParam=Jasper')
	      .expect(200)
	      .expect(function (response) {
	    	//Check that the dog name matches
	        expect(response.body.dogName).to.equal("Jasper");
	        
	        //Check that owner name matches
	        expect(response.body.ownerFirstName).to.equal("Billy");
	        
	        //Check that the walkArray is present and correct
	        expect(response.body.walks.walkArray[0].walkDate).to.not.be.undefined;
	        var date = new Date(response.body.walks.walkArray[0].walkDate);
	        console.log(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear());
	        expect(date.getDate()).to.equal(1);
	        expect(date.getMonth()).to.equal(9);
	        expect(date.getFullYear()).to.equal(2015);
	        
	        expect(response.body.walks.walkArray[1].walkTime).to.not.be.undefined;
	        expect(response.body.walks.walkArray[1].walkTime).to.equal('60');
	      })
	      .end(done)
	    })
	})

})


//Test Post
describe('controllers.api.dogs - test saving an existing dog', function () {
 

		  
	 var dog = [

	         	{dogName: 'BobbyJoe', 
	 	        	ownerFirstName: 'Billy',
	 	        	ownerLastName: 'TwoRivers',
	 	        	dogDOB: '02-02-2011',
	 	        	dogStartDate: '11-11-2013',
	 	        	walks: {
	 	        		walkArray: [
	 	        		           {
	 	        		        	   walkDate: '10-01-2015',
	 	        		        	   walkTime: '30'
	 	        		           	},
	 	        		        	{
	 	        		        		walkDate: '10-02-2015',
	 		        		        	walkTime: '60'
	 	        		        	}
	 	        		           ]
	 	        		
	 	        	}}
	 	      ]
	
	
	    
	    
	it('saves a dog successfully', function(){
		
			console.log('about to try and save the dog');
			api.post("/api/dog", dog).expect(200).expect(function (response){
		   
		      })
		    
		
	})
})



//Dog Picture encoded as a string to add to the database in a test
var dogPic="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QD6RXhpZgAATU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgExAAIAAAANAAAAZgEyAAIAAAAUAAAAdIdpAAQAAAABAAAAiAAAAAAAAABIAAAAAQAAAEgAAAABQXBlcnR1cmUgMy42AAAyMDE1OjA5OjA5IDEyOjEwOjE3AAAFkAMAAgAAABQAAADKkAQAAgAAABQAAADeoAEAAwAAAAEAAQAAoAIABAAAAAEAAABAoAMABAAAAAEAAABAAAAAADIwMTU6MDk6MDkgMTI6MTA6MTcAMjAxNTowOTowOSAxMjoxMDoxNwD/4QoUaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNS0wOS0wOVQxMjoxMDoxNyIgeG1wOkNyZWF0b3JUb29sPSJBcGVydHVyZSAzLjYiIHhtcDpNb2RpZnlEYXRlPSIyMDE1LTA5LTA5VDEyOjEwOjE3IiBwaG90b3Nob3A6RGF0ZUNyZWF0ZWQ9IjIwMTUtMDktMDlUMTI6MTA6MTciLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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";