angular.module('myApp')
.controller('adminCtrl', function($scope, user, mainService) {
  $scope.user = user;

  $scope.logout = mainService.logout();
})
