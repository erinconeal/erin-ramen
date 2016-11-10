angular.module('myApp')
.controller('admin_update_menuCtrl',  function($scope, mainService, adminSrv, food, $interval) {

  $scope.addToMenu = function(food) {
    adminSrv.addFood(food);
  };

  $scope.getMenu = function() {
    mainService.getMenu()
    .then(function(response){
    $scope.menu = response;
    })
  }();


  $scope.delete = function(id) {
    console.log(id);
    adminSrv.deleteFood(id)
    .then(function(response) {
      $scope.getMenu();
    });
  };

  $interval(function(){
    $scope.getMenu = function() {
      mainService.getMenu()
      .then(function(response){
      $scope.menu = response;
      })
    }
  }, 500);

  
  // $scope.update = adminSrv.updateFood();

});
