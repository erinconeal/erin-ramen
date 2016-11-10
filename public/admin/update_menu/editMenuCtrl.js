angular.module('myApp')
.controller('editMenuCtrl', function($scope, $state,  mainService, adminSrv, item) {
  $scope.item = item.data;
  console.log($scope.item);
  $scope.id = $state.params.id;

  $scope.updateItem = function(id, food_name, image, description, price) {

    adminSrv.updateFood(id, food_name, image, description, price)
  };
});
