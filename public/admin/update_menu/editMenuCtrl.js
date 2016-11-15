angular.module('myApp')
.controller('editMenuCtrl', function($scope, $state,  mainService, adminSrv, item) {
  $scope.item = item.data;
  $scope.id = $state.params.id;
  console.log($scope.item);

  $scope.updateItem = function(id, food_name, image, food_cat_id, description, price) {
    adminSrv.updateFood(id, food_name, image, food_cat_id, description, price)
  };

  $scope.getCategories = function() {
    mainService.GetAllCategories()
    .then(function(response) {
      $scope.categories = response
    })
  }();

});
