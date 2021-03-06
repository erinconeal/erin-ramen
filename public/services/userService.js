angular.module("myApp").service("userService", function($http) {

  this.getUsers = function() {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function(response) {
      return response;
    });
  };

  this.getUser = function(id) {
    return $http({
      method: 'GET',
      url: '/user?_id=' + id
    }).then(function(response) {
      return response;
    });
  };

  // Not Needed
  //
  // this.deleteUser = function(id) {
  //   return $http({
  //     method: 'DELETE',
  //     url: '/user/' + id
  //   }).then(function(response) {
  //     return response;
  //   });
  // };
});
