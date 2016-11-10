angular.module('myApp')
.controller('submitCtrl', function($scope, mainService, $stateParams) {
  // $scope.getReceipt = mainService.getCustOrder(tableId)
// $scope.getOrderId = mainService.orderTableId;
  $scope.cart = mainService.cart;
  console.log(mainService.cart);


  $scope.getTotal = function() {
    $scope.total_price = 0;
    for (var i = 0; i < $scope.cart.length; i++) {
      $scope.total_price += ($scope.cart[i].qty * $scope.cart[i].price)
    }
    return $scope.total_price
  };
});
