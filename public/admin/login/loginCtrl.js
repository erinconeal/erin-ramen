angular.module('myApp')
.controller('loginCtrl', function($scope, $state, mainService) {
  $scope.login = function(user) {
    mainService.login(user)
    .then(function(response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        $state.go('admin');
      }
    })
    .catch(function(err) {
      alert('Unable to login');
    });
  };

  $scope.register = function(user) {
    mainService.registerUser(user).then(function(response) {
      if (!response.data) {
        alert('Unable to create user');
      } else {
        alert('User Created');
        $scope.newUser = {};
      }
    }).catch(function(err) {
      alert('Unable to create user');
    });
  };

})
