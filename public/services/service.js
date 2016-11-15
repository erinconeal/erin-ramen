angular.module('myApp')
.service('mainService', function($http) {

  this.getMenu = function() {
    return $http({
      method: 'GET',
      url: '/menu'
    })
    .then(function(response) {
      return response.data;
    });
  };

  this.getOneMenuItem = function(id) {
    return $http({
      method: 'GET',
      url: '/menu/' + id
    })
    .catch(function(err) {
			console.log(err);
		});
  };

  this.GetAllCategories = function() {
    return $http({
      method: 'GET',
      url: '/categories'
    })
    .then(function(response) {
      return response.data;
    })
  };

  this.createCustomer = function(customer) {
    console.log("customer obj? ", customer);
    return $http({
      method: 'POST',
      url: '/createcustomer',
      data: customer
    });
  };

  this.getCustomers = function() {
		return $http({
			method: 'GET',
			url: '/customers'
		});
	};

	this.getCustOrder = function(id) {
    console.log(id);
		return $http({
				method: 'GET',
				url: '/api/order/' + id
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	this.addToCart = function(id, order_id, qty) {
		return $http({
			method: 'POST',
			url: '/api/add/item/cart/' + id,
			data: {
				id: order_id,
				qty: qty
			}
		});
	};

	this.updateProductQty = function(id, qty) {
		return $http({
			method: 'PUT',
			url: "/api/update/qty/" + id,
			data: {
				qty: qty
			}
		});
	};

	this.removeFromCart = function(id) {
		return $http({
			method: 'DELETE',
			url: '/api/delete/item/cart/' + id
		});
	};

	this.placeOrder = function(cartArr, user_id) {
    console.log(user_id);
		return $http({
			method: 'POST',
			url: '/api/order/' + user_id,
      data: {cart: cartArr}
		});
	};

  this.login = function(user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function(response) {
      return response;
    });
  };

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function(response) {
      return response;
    });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function(response) {
      return response;
    });
  };

  this.registerUser = function(user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then(function(response) {
      return response;
    });
  };

  this.editUser = function(id, user) {
    return $http({
      method: 'PUT',
      url: "/user/" + id,
      data: user
    }).then(function(response) {
      return response;
    });
  };
// ALEX ADDED STUFF
this.orderTableId = function(phoneNum){
  return $http({
    method: "GET",
    url: "/get/order/" + phoneNum
  })
}

this.cart = [];

})
