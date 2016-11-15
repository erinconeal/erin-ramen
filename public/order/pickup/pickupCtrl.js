angular.module('myApp')
.controller('pickupCtrl', function($scope, mainService, food, $state) {
  // $scope.menuItems = mainService.getMenu();

  $scope.food = food;
  $scope.cartArr = [];

  $scope.order_id = $state.params.cartid;
  $scope.qty = 1;

  $scope.addToCart = function(food_id, food_name, qty, price) {
    $scope.cartArr.push({id: food_id, food_name: food_name, qty: qty, price: price})
    mainService.cart = $scope.cartArr;
    console.log($scope.cartArr);
    $scope.getTotal();
  };

  $scope.deleteItem = function(item) {
    var index = $scope.cartArr.indexOf(item);
    $scope.cartArr.splice(index, 1);
    mainService.cart = $scope.cartArr;
    $scope.getTotal();
  };

  $scope.getTotal = function() {
    $scope.total_price = 0;
    for (var i = 0; i < $scope.cartArr.length; i++) {
      $scope.total_price += ($scope.cartArr[i].qty * $scope.cartArr[i].price)
    }
  };

  $scope.submitOrder = function(customer, cartArr) { //order_id, qty
    console.log("customer " + customer.phone_num);

    var cart = [];
    for (var i = 0; i < cartArr.length; i++) {
      cart.push(cartArr[i].id);
    }
    console.log(cart);
    // mainService.addToCart(cartArr, order_id, qty)
    mainService.createCustomer(customer)
    .then(function(response){
      console.log("Your customer id is ", response.data.id);
      mainService.placeOrder(cart, response.data.id)
      .then(function(response) {
        console.log(cart);
          console.log("Your order id is ", response.data.id);
        });
    })
  };

  $scope.getOrderTableId = function(phoneNum){
    $scope.cool = mainService.orderTableId(phoneNum).then(function(response){
      console.log(response);
      var idarr = response.data;
      var arr = [];
      for (var i = 0; i < idarr.length; i++) {
        arr.push(idarr[i]);
      }
      arr.reverse();
      $scope.tableId = arr[0].id;
      console.log("can we win yet? " + $scope.tableId);

    })
  }


  // .then(function(response){
  //   console.log(response);
  //   $scope.tableId = response;
  // });
  // console.log($scope.getOrderTableId);


});
