////////////////////////////////////////
//Angular Controller file.  
//Called by the HTML page that contains Angular tags
//Calls to dogs.svc.js
////////////////////////////////////////


//Next 2 "directives" are an attempt to get date formatting to work

angular.module('app').directive('moDateInput', function ($window) {
	
    return {
        require:'^ngModel',
        restrict:'A',
        link:function (scope, elm, attrs, ctrl) {
        	
            var moment = $window.moment;
            var dateFormat = attrs.moMediumDate;
            attrs.$observe('moDateInput', function (newValue) {
                if (dateFormat == newValue || !ctrl.$modelValue) return;
                dateFormat = newValue;
                ctrl.$modelValue = new Date(ctrl.$setViewValue);
            });

            ctrl.$formatters.unshift(function (modelValue) {
            	
                scope = scope;
                if (!dateFormat || !modelValue) return "";
                var retVal = moment(modelValue).format(dateFormat);
                return retVal;
            });

            ctrl.$parsers.unshift(function (viewValue) {
            	;
                scope = scope;
                var date = moment(viewValue, dateFormat);
                return (date && date.isValid() && date.year() > 1950 ) ? date.toDate() : "";
            });
        }
    };
});


angular.module('app').directive('moChangeProxy', function ($parse) {
	console.log('Inside moChangeProxy');
	
    return {
        require:'^ngModel',
        restrict:'A',
        link:function (scope, elm, attrs, ctrl) {
            var proxyExp = attrs.moChangeProxy;
            var modelExp = attrs.ngModel;
            scope.$watch(proxyExp, function (nVal) {
                if (nVal != ctrl.$modelValue)
                    $parse(modelExp).assign(scope, nVal);
            });
            elm.bind('blur', function () {
                var proxyVal = scope.$eval(proxyExp);
                if(ctrl.$modelValue != proxyVal) {
                    scope.$apply(function(){
                        $parse(proxyExp).assign(scope, ctrl.$modelValue);
                    });
                }
            });
        }
    };
});


//Load the dog list onto the screen after pulling back from service. 
//Image is pulled back within the JSON, nothing special has to be done
angular.module('app').controller('DogsCtrl', function ($scope, DogsSvc) {
   
	DogsSvc.fetch().success(function (dogs) {
		
		console.log('Total Number of dogs is: ' + dogs.length);
			
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



//Controller to take the selected dog and show an edit page for that dog
angular.module('app').controller('EditCtrl', function ($location, $scope, DogsGetOneSvc) {
 
	//TO DO - is this variable thread safe???
	var hasNewWalk = false;
	
	//Get the dog name from the query string - TODO - make this the dog unique ID In future.
	var searchObject = $location.search();
	
	//Search database for dog with this name
	//Show dog details on the screen
	
	DogsGetOneSvc.fetch(searchObject.dogName).success(function (dog) {
		  $scope.dog = dog
		})
		
		
	//Add a new walk line to the table
	$scope.addNewWalk = function() {
		
		hasNewWalk = true;
		var currentWalkCount = $scope.dog.walks.walkArray.length;
		var today = new Date();
		
		$scope.dog.walks.walkArray.push({'walkDate':today, 'walkTime': '60'});

	    console.log('adding a new walk, now have: ' + (currentWalkCount+1));

	    
	  };
	  
	//Remove a walk line from the table
	$scope.removeWalk = function(index) {
		
	    console.log('Going to remove walk from list at position: ' + index);
		
		$scope.dog.walks.walkArray.splice(index, 1);
		
	  };
	  
	  
	//TO DO - need a way to determine if any of the walk state has changed, and return true only if it has.
	$scope.hasUpdatedWalk = function() {
	         return hasNewWalk;  
	    };  
})
 
//Controller to delete the selected dog from the database
angular.module('app').controller('DeleteCtrl', function ($location, $scope, DogsDeleteSvc) {
 
	//Get the dog ID from the query string
	var searchObject = $location.search();
	
	//Remove the dog from the database
	DogsDeleteSvc.delete(searchObject.dogId).success(function (dog) {
		  $scope.dog = dog
		})
	
})

//Controller to update the selected dog in the database
angular.module('app').controller('UpdateCtrl', function ($location, $scope, DogsUpdateSvc) {
 
	console.log('About to update Dog: ');
	
})


