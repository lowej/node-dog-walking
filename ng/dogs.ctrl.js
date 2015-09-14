////////////////////////////////////////
//Angular Controller file.  
//Called by the HTML page that contains Angular tags
//Calls to dogs.svc.js
////////////////////////////////////////


//Load the dog list onto the screen after pulling back from service. 
//Image is pulled back within the JSON, nothing special has to be done
angular.module('app').controller('DogsCtrl', function ($scope, DogsSvc) {
   
	DogsSvc.fetch().success(function (dogs) {
		  $scope.dogs = dogs
		})
	 
})

 
//All creation of dogs from data entry on the screen
//The ng-click calls the addDog function
//Note I added the $window parameter to allow flick back to list after creation

angular.module('app').controller('CreateCtrl', function ($window, $scope, DogCreationSvc) {
   
	$scope.addDog = function(){
		
		console.log('Just adding a dog');
		//console.log('$scope.image = ' + $scope.image);
		console.log('$scope.dogStartDate' + $scope.dogStartDate);
		//The above line confirms that the image read in upload is also visible when a come to 
		//submit the entire dog page.  ==> Now need to get images across to the Node service and then saved in Mongo!!
		
		if($scope.dogName){   //Create the JSON object to send to the service call
			DogCreationSvc.create({
				dogName: $scope.dogName, 
				ownerFirstName: $scope.ownerFirstName, 
				ownerLastName: $scope.ownerSurname, 
				dogDOB:$scope.dogDOB,
				dogStartDate:$scope.dogStartDate,
				dogPicture:$scope.image
			})
			.success(function (dog){
				$window.location.href='/#/'  
				//JL added this href to take the user back to list page.  May be a better way of doing this.
				//Solution is here: http://stackoverflow.com/questions/27941876/how-to-redirect-to-another-page-using-angular-js
			})
		}
	}
})	

//Added this controller to allow user to pick a file for their dog.
//Code taken from here: http://stackoverflow.com/questions/19986178/displaying-an-image-after-uploading-in-angular-js
angular.module('app').controller('UploadCtrl', ['$scope', function ($scope) {
            $scope.image = "";
        }]).directive('myUpload', [function () {
            return {
                restrict: 'A',
                link: function ($scope, elem, attrs) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.image = e.target.result;
                        $scope.$apply();
                    }

                    //On change of 'state', read a new file
                    elem.on('change', function() {
                        reader.readAsDataURL(elem[0].files[0]);
                    });
                }
            };
        }]);


