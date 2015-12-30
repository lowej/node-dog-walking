
//Allows the loggedin user to be displayed on top RHS of SPA
angular.module('app')
.controller('ApplicationCtrl', function ($scope) {
  $scope.$on('login', function (_, user) {
    $scope.currentUser = user
  })
})