////////////////////////////////////////
//Angular Services file.  
//Called by dog.ctrl.js file
//Calls to HTTP service in dogs.js
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