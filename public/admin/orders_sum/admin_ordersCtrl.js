angular.module('myApp')
.controller('admin_ordersCtrl', function($scope, adminSrv, mainService, $interval) {
  $scope.getOrders = function() {
    adminSrv.getOrderstoFill()
    .then(function(response) {
      $scope.orders = response;
    });
  }();

  // $scope.getAllFood = mainService.getMenu()
  // .then(function(response) {
  //   $scope.menu = {};
  //   response.forEach(function(food_item) {
  //     $scope.menu[food_item.id] = food_item
  //   });
  // });

  $scope.deleteOrder = function(id) {
    adminSrv.removeOrder(id)
    .then(function(response) {
      $scope.getOrders();
    });
  };

  $interval(function(){
    $scope.getOrders = function() {
      adminSrv.getOrderstoFill()
      .then(function(response) {
        $scope.orders = response;
      })
    }
  }, 500);
});
