///////////////////////////////////////////
//Angular code split out from the HTML file.
///////////////////////////////////////////


//Load the dog list onto the screen after pulling back from service. 
var app = angular.module('app', [])
app.controller('DogsCtrl', function ($scope, DogsSvc) {
   
	DogsSvc.fetch().success(function (dogs) {
		  $scope.dogs = dogs
		})
	 
})
    
    
app.service('DogsSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/dogs')
  }
})