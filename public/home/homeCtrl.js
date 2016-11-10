angular.module('myApp')
.controller('homeCtrl', function($scope, mainService, food) {
  // $scope.menuItems = mainService.getMenu();
  $scope.food = food;
})
