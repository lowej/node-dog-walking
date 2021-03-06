//////////////
// Determines which HTML to load depending on which navigation link the user has clicked
// Links the HTML page to the Angular controller


angular.module('app')
.config(function ($routeProvider) {
  $routeProvider
  .when('/', { controller: 'DogsCtrl', templateUrl: 'dogList.html' })
  .when('/createDog', { controller: 'CreateCtrl', templateUrl: 'dogCreation.html' })
  .when('/editDog', { controller: 'EditCtrl', templateUrl: 'dogEdit.html'})
   .when('/deleteDog', { controller: 'DeleteCtrl', templateUrl: 'dogList.html'})
   .when('/updateDog', { controller: 'UpdateCtrl', templateUrl: 'dogList.html'})
   .when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html' })
   .when('/editDogDetails', { controller: 'EditDetailCtrl', templateUrl: 'dogEditDetails.html' })
   .when('/exportWalks', { controller: 'exportWalksCtrl', templateUrl: 'walkExport.html' })
})

