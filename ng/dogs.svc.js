////////////////////////////////////////
//Angular Services file.  
//Called by dog.ctrl.js file
//Calls to HTTP service in dogs.js (I.E a RESTFul HTTP call to Node)
////////////////////////////////////////

//Get the list of dogs to show on the screen

angular.module('app').service('DogsSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/dogs')
  }
})



//Save a new dog to the HTTP post service
angular.module('app').service('DogCreationSvc', function ($http) {
	
  this.create = function (dog) {
    return $http.post('/api/dog', dog)
    } 
})


//Get a single dog from the store by name
angular.module('app').service('DogsGetOneSvc', function ($http) {
  this.fetch = function (dogName) {
	  
	console.log('Inside the angular service layer.  Have been asked to get dog: ' + dogName); 
	 
	return $http({
		url: '/api/dog', 
		method: "GET",
		params:{dogNameParam:dogName}
	})
  }
})


//Delete a single dog from the store by ID
angular.module('app').service('DogsDeleteSvc', function ($http) {
 
	this.delete = function (dogId) {
	  
	console.log('Inside the angular service layer.  Have been asked to delete dog: ' + dogId); 
	 
	return $http({
		url: '/api/dog', 
		method: "DELETE",
		params:{dogIdParam:dogId}
	})
	
  }
})


//Update a dog already in the database
angular.module('app').service('DogsUpdateSvc', function ($http) {
 
	
  this.update = function (dog) {
	  
		console.log('Inside the angular service layer.  Have been asked to save dog: ' + dog.dogName); 
		 
		//Trick here was to pass the dog across using the "data" tag
		return $http({
			url: '/api/dog/'+dog._id, 
			method: "PUT",
			data:dog
		})
	  }
	 

})