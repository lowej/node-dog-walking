angular.module('app').controller('LoginCtrl', function ($scope, UserSvc) {
	
  var loginFailed = false;
  var failedCount = 0;
	
  $scope.login = function (username, password) {
    UserSvc.login(username, password)
    .then(function (response) {

      loginFailed  = false;
      $scope.$emit('login', response.data);
    }).catch(function(){
    	loginFailed = true;
    	failedCount++;
    })
  }
  
  //Added by JL to allow change of colour when login fails.  
	$scope.getTextColour = function() {
        if(loginFailed == true){
       	 return {'background-color': 'pink'};
        } else {
       	 return {'background-color': 'white'};
        }
   };
   
   //Added by JL to give inidication to user of the number of failed login attempts
	$scope.getFailedLoginAttempts = function() {
        return failedCount;
   };
  
})