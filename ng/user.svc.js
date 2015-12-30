
//Just need to send up the X-Auth header on the post creation request. 
//You could add this directly to the posts controller, but the better 
//way would be to globally add that header for all requests so you won’t 
//have to keep remembering to do that. 

angular.module('app')
.service('UserSvc', function ($http) {
  var svc = this
  svc.getUser = function () {
    return $http.get('/api/users')
   }

  //Login function
  svc.login = function (username, password) {
    return $http.post('/api/sessions', {
      username: username, password: password
    }).then(function (val) {
      svc.token = val.data
      $http.defaults.headers.common['X-Auth'] = val.data
      return svc.getUser()
    })
  }
  
})