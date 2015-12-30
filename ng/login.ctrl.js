angular.module('app').controller('LoginCtrl', function ($scope, UserSvc) {
	
  var loginFailed = false;
	
  $scope.login = function (username, password) {
    UserSvc.login(username, password)
    .then(function (response) {
      $scope.$emit('login', response.data)
    })
  }
  
  //Added by JL to allow change of colour when login fails.  Need to work out how to trap login failure
  //above for this to be useful!
	$scope.getTextColour = function() {
        if(loginFailed == true){
       	 return {'background-color': 'pink'};
        } else {
       	 return {'background-color': 'white'};
        }
   };
  
})