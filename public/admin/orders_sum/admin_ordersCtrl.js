angular.module('myApp')
.controller('admin_ordersCtrl', function($scope, adminSrv) {
  $scope.getOrders = function() {
    adminSrv.getOrderstoFill()
    .then(function(response) {
      $scope.orders = response;
    })
  }();

});
