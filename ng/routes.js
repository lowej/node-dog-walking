//////////////
// Determines which HTML to load depending on which navigation link the user has clicked


angular.module('app')
.config(function ($routeProvider) {
  $routeProvider
  .when('/', { controller: 'DogsCtrl', templateUrl: 'dogList.html' })
  .when('/createDog', { controller: 'CreateCtrl', templateUrl: 'dogCreation.html' })
})

