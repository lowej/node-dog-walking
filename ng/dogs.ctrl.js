////////////////////////////////////////
//Angular Controller file.  
//Called by the HTML page that contains Angular tags
//Calls to dogs.svc.js
////////////////////////////////////////


//Load the dog list onto the screen after pulling back from service. 

angular.module('app').controller('DogsCtrl', function ($scope, DogsSvc) {
   
	DogsSvc.fetch().success(function (dogs) {
		  $scope.dogs = dogs
		})
	 
})

 
//All creation of dogs from data entry on the screen
//The ng-click calls the addDog function

angular.module('app').controller('CreateCtrl', function ($window, $scope, DogCreationSvc) {
   
	$scope.addDog = function(){
		if($scope.dogName){   //Create the JSON object to send to the service call
			DogCreationSvc.create({
				dogName: $scope.dogName, 
				ownerFirstName: $scope.ownerFirstName, 
				ownerLastName: $scope.ownerSurname, 
				dogDOB:$scope.dogDOB
			})
			.success(function (dog){
				$scope.dogName = null
				$window.location.href='/#/'  //JL added this to take the user back to list page.  May be a better way of doing this.
			})
		}
	}
	
})	