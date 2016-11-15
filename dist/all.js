'use strict';

angular.module('myApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl',
    url: '/',
    resolve: {
      food: function food(mainService) {
        return mainService.getMenu();
      }
    }
  }).state('contact', {
    templateUrl: 'contact/contact_map.html',
    controller: 'contactCtrl',
    url: '/contact'
  }).state('order', {
    templateUrl: 'order/order_main.html',
    controller: 'orderCtrl',
    url: '/order'
  }).state('delivery', {
    templateUrl: '/order/delivery/delivery.html',
    controller: 'deliveryCtrl',
    url: '/delivery'
  }).state('pickup', {
    templateUrl: '/order/pickup/pickup.html',
    controller: 'pickupCtrl',
    url: '/pickup',
    resolve: {
      food: function food(mainService) {
        return mainService.getMenu();
      }
      // ,
      // tableId: function(mainService, phoneNum){
      //   return mainService.orderTableId(phoneNum);
      // }
    }
  }).state('submitted', {
    templateUrl: '/order/submitted/submit.html',
    controller: 'submitCtrl',
    url: '/submitted',
    resolve: {
      orders: function orders(mainService) {
        return mainService.getCustOrder();
      }
    }
  }).state('login', {
    templateUrl: '/admin/login/admin_login.html',
    controller: 'loginCtrl',
    url: '/login'
  }).state('logout', {
    templateUrl: '/admin/login/admin_login.html',
    controller: 'loginCtrl',
    url: '/login'
  }).state('admin', {
    templateUrl: '/admin/admin_main.html',
    controller: 'adminCtrl',
    url: '/admin',
    resolve: {
      user: function user(mainService, $state) {
        return mainService.getCurrentUser().then(function (response) {
          if (!response.data) $state.go('login');
          return response.data;
        }).catch(function (err) {
          $state.go('login');
        });
      }
    }
  }).state('orderSum', {
    templateUrl: '/admin/orders_sum/admin_orders_summary.html',
    controller: 'admin_ordersCtrl',
    url: '/ordersummary',
    resolve: {
      orders: function orders(adminSrv) {
        return adminSrv.getOrderstoFill();
      }
    }
  }).state('updateMenu', {
    templateUrl: '/admin/update_menu/admin_update_menu.html',
    controller: 'admin_update_menuCtrl',
    url: '/updatemenu',
    resolve: {
      food: function food(mainService) {
        return mainService.getMenu();
      },
      categories: function categories(mainService) {
        return mainService.GetAllCategories();
      }
    }
  }).state('editmenuitem', {
    templateUrl: '/admin/update_menu/editMenu.html',
    controller: 'editMenuCtrl',
    url: '/editmenuitem/:id',
    resolve: {
      item: function item(mainService, $stateParams) {
        return mainService.getOneMenuItem($stateParams.id);
      },
      categories: function categories(mainService) {
        return mainService.GetAllCategories();
      }
    }
  });
});
'use strict';

$(document).ready(function () {
  $(function () {
    // Select link by id and add click event
    $('#anchor').click(function () {

      $('html,body').animate({
        scrollTop: $("#anchor").offset().top }, // Tell it to scroll to the top
      2000 // How long scroll will take in milliseconds
      );
      // Prevent default behavior of link
      return false;
    });
  });
});
'use strict';

angular.module('myApp').controller('adminCtrl', function ($scope, user, mainService) {
  $scope.user = user;

  $scope.logout = mainService.logout();
});
'use strict';

angular.module('myApp').controller('contactCtrl', function () {});
'use strict';

angular.module('myApp').directive('footerDir', function () {
  return {
    templateUrl: './footer/footerDirTmpl.html',
    restrict: 'E'
  };
});
'use strict';

angular.module('myApp').directive('headerDir', function () {
  return {
    templateUrl: 'header/headerDirTmpl.html',
    restrict: 'E'
  };
});
'use strict';

angular.module('myApp').controller('homeCtrl', function ($scope, mainService, food) {
  // $scope.menuItems = mainService.getMenu();
  $scope.food = food;
});
'use strict';

angular.module('myApp').controller('orderCtrl', function () {});
'use strict';

angular.module('myApp').service('adminSrv', function ($http) {

  this.addFood = function (food) {
    return $http({
      method: 'POST',
      url: '/addfood',
      data: food
    }).then(function (response) {
      return response.data;
    });
  };

  this.addCategory = function (new_category) {
    return $http({
      method: 'POST',
      url: '/addcategory',
      data: new_category
    }).then(function (response) {
      return response.data;
    });
  };

  this.updateFood = function (id, food_name, image, food_cat_id, description, price) {
    return $http({
      method: 'PUT',
      url: '/update/' + id,
      data: {
        food_name: food_name,
        image: image,
        food_cat_id: food_cat_id,
        description: description,
        price: price
      }
    }).then(function (response) {
      return response.data;
    });
  };

  this.deleteFood = function (id) {
    return $http({
      url: '/deletefood/' + id,
      method: 'DELETE'
    });
  };

  this.getOrderstoFill = function () {
    return $http({
      method: 'GET',
      url: '/orderstofill'
    }).then(function (response) {
      return response.data;
    });
  };

  this.removeOrder = function (id) {
    return $http({
      method: 'DELETE',
      url: '/deleteorder/' + id
    });
  };
});
'use strict';

angular.module('myApp').service('mainService', function ($http) {

  this.getMenu = function () {
    return $http({
      method: 'GET',
      url: '/menu'
    }).then(function (response) {
      return response.data;
    });
  };

  this.getOneMenuItem = function (id) {
    return $http({
      method: 'GET',
      url: '/menu/' + id
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.GetAllCategories = function () {
    return $http({
      method: 'GET',
      url: '/categories'
    }).then(function (response) {
      return response.data;
    });
  };

  this.createCustomer = function (customer) {
    console.log("customer obj? ", customer);
    return $http({
      method: 'POST',
      url: '/createcustomer',
      data: customer
    });
  };

  this.getCustomers = function () {
    return $http({
      method: 'GET',
      url: '/customers'
    });
  };

  this.getCustOrder = function (id) {
    console.log(id);
    return $http({
      method: 'GET',
      url: '/api/order/' + id
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.addToCart = function (id, order_id, qty) {
    return $http({
      method: 'POST',
      url: '/api/add/item/cart/' + id,
      data: {
        id: order_id,
        qty: qty
      }
    });
  };

  this.updateProductQty = function (id, qty) {
    return $http({
      method: 'PUT',
      url: "/api/update/qty/" + id,
      data: {
        qty: qty
      }
    });
  };

  this.removeFromCart = function (id) {
    return $http({
      method: 'DELETE',
      url: '/api/delete/item/cart/' + id
    });
  };

  this.placeOrder = function (cartArr, user_id) {
    console.log(user_id);
    return $http({
      method: 'POST',
      url: '/api/order/' + user_id,
      data: { cart: cartArr }
    });
  };

  this.login = function (user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function (response) {
      return response;
    });
  };

  this.logout = function () {
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function (response) {
      return response;
    });
  };

  this.getCurrentUser = function () {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function (response) {
      return response;
    });
  };

  this.registerUser = function (user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then(function (response) {
      return response;
    });
  };

  this.editUser = function (id, user) {
    return $http({
      method: 'PUT',
      url: "/user/" + id,
      data: user
    }).then(function (response) {
      return response;
    });
  };
  // ALEX ADDED STUFF
  this.orderTableId = function (phoneNum) {
    return $http({
      method: "GET",
      url: "/get/order/" + phoneNum
    });
  };

  this.cart = [];
});
"use strict";

angular.module("myApp").service("userService", function ($http) {

  this.getUsers = function () {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function (response) {
      return response;
    });
  };

  this.getUser = function (id) {
    return $http({
      method: 'GET',
      url: '/user?_id=' + id
    }).then(function (response) {
      return response;
    });
  };

  // Not Needed
  //
  // this.deleteUser = function(id) {
  //   return $http({
  //     method: 'DELETE',
  //     url: '/user/' + id
  //   }).then(function(response) {
  //     return response;
  //   });
  // };
});
'use strict';

angular.module('myApp').controller('loginCtrl', function ($scope, $state, mainService) {
  $scope.login = function (user) {
    mainService.login(user).then(function (response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        $state.go('admin');
      }
    }).catch(function (err) {
      alert('Unable to login');
    });
  };

  $scope.register = function (user) {
    mainService.registerUser(user).then(function (response) {
      if (!response.data) {
        alert('Unable to create user');
      } else {
        alert('User Created');
        $scope.newUser = {};
      }
    }).catch(function (err) {
      alert('Unable to create user');
    });
  };
});
'use strict';

angular.module('myApp').controller('admin_ordersCtrl', function ($scope, adminSrv, mainService, $interval) {
  $scope.getOrders = function () {
    adminSrv.getOrderstoFill().then(function (response) {
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

  $scope.deleteOrder = function (id) {
    adminSrv.removeOrder(id).then(function (response) {
      $scope.getOrders();
    });
  };

  $interval(function () {
    $scope.getOrders = function () {
      adminSrv.getOrderstoFill().then(function (response) {
        $scope.orders = response;
      });
    };
  }, 500);
});
'use strict';

angular.module('myApp').controller('admin_update_menuCtrl', function ($scope, mainService, adminSrv, food, $interval) {

  $scope.addToMenu = function (food) {
    adminSrv.addFood(food);
  };

  $scope.getMenu = function () {
    mainService.getMenu().then(function (response) {
      $scope.menu = response;
    });
  }();

  $scope.getCategories = function () {
    mainService.GetAllCategories().then(function (response) {
      $scope.categories = response;
    });
  }();

  $scope.delete = function (id) {
    adminSrv.deleteFood(id).then(function (response) {
      $scope.getMenu();
    });
  };

  $interval(function () {
    $scope.getMenu = function () {
      mainService.getMenu().then(function (response) {
        $scope.menu = response;
      });
    };
  }, 500);

  // $scope.update = adminSrv.updateFood();
});
'use strict';

angular.module('myApp').controller('editMenuCtrl', function ($scope, $state, mainService, adminSrv, item) {
  $scope.item = item.data;
  $scope.id = $state.params.id;
  console.log($scope.item);

  $scope.updateItem = function (id, food_name, image, food_cat_id, description, price) {
    adminSrv.updateFood(id, food_name, image, food_cat_id, description, price);
  };

  $scope.getCategories = function () {
    mainService.GetAllCategories().then(function (response) {
      $scope.categories = response;
    });
  }();
});
'use strict';

angular.module('myApp').controller('deliveryCtrl', function ($scope, mainService) {});
'use strict';

angular.module('myApp').controller('pickupCtrl', function ($scope, mainService, food, $state) {
  // $scope.menuItems = mainService.getMenu();

  $scope.food = food;
  $scope.cartArr = [];

  $scope.order_id = $state.params.cartid;
  $scope.qty = 1;

  $scope.addToCart = function (food_id, food_name, qty, price) {
    $scope.cartArr.push({ id: food_id, food_name: food_name, qty: qty, price: price });
    mainService.cart = $scope.cartArr;
    console.log($scope.cartArr);
    $scope.getTotal();
  };

  $scope.deleteItem = function (item) {
    var index = $scope.cartArr.indexOf(item);
    $scope.cartArr.splice(index, 1);
    mainService.cart = $scope.cartArr;
    $scope.getTotal();
  };

  $scope.getTotal = function () {
    $scope.total_price = 0;
    for (var i = 0; i < $scope.cartArr.length; i++) {
      $scope.total_price += $scope.cartArr[i].qty * $scope.cartArr[i].price;
    }
  };

  $scope.submitOrder = function (customer, cartArr) {
    //order_id, qty
    console.log("customer " + customer.phone_num);

    var cart = [];
    for (var i = 0; i < cartArr.length; i++) {
      cart.push(cartArr[i].id);
    }
    console.log(cart);
    // mainService.addToCart(cartArr, order_id, qty)
    mainService.createCustomer(customer).then(function (response) {
      console.log("Your customer id is ", response.data.id);
      mainService.placeOrder(cart, response.data.id).then(function (response) {
        console.log(cart);
        console.log("Your order id is ", response.data.id);
      });
    });
  };

  $scope.getOrderTableId = function (phoneNum) {
    $scope.cool = mainService.orderTableId(phoneNum).then(function (response) {
      console.log(response);
      var idarr = response.data;
      var arr = [];
      for (var i = 0; i < idarr.length; i++) {
        arr.push(idarr[i]);
      }
      arr.reverse();
      $scope.tableId = arr[0].id;
      console.log("can we win yet? " + $scope.tableId);
    });
  };

  // .then(function(response){
  //   console.log(response);
  //   $scope.tableId = response;
  // });
  // console.log($scope.getOrderTableId);

});
'use strict';

angular.module('myApp').controller('submitCtrl', function ($scope, mainService, $stateParams) {
  // $scope.getReceipt = mainService.getCustOrder(tableId)
  // $scope.getOrderId = mainService.orderTableId;
  $scope.cart = mainService.cart;
  console.log(mainService.cart);

  $scope.getTotal = function () {
    $scope.total_price = 0;
    for (var i = 0; i < $scope.cart.length; i++) {
      $scope.total_price += $scope.cart[i].qty * $scope.cart[i].price;
    }
    return $scope.total_price;
  };
});