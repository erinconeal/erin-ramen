angular.module('myApp')
.service('adminSrv', function($http) {

  this.addFood = function(food) {
    console.log("SRVC");
    return $http({
      method: 'POST',
      url: '/addfood',
      data: food
    })
    .then(function(response) {
      return response.data;
    });
  };

  this.addCategory = function(new_category) {
    return $http({
      method: 'POST',
      url: '/addcategory',
      data: new_category
    })
    .then(function(response) {
      return response.data;
    });
  };

  this.updateFood = function(id, food_name, image, description, price) {
    return $http({
      method: 'PUT',
      url: '/update/' + id,
      data: {
        food_name: food_name,
        image: image,
        description: description,
        price: price
      }
    })
    .then(function(response) {
      return response.data;
    });
  };

  this.deleteFood = function(id) {
    return $http({
      url: '/deletefood/' + id,
      method: 'DELETE'
    });
  };

  this.getOrderstoFill = function() {
    return $http({
      method: 'GET',
      url: '/orderstofill'
    })
    .then(function(response) {
      return response.data;
    })
  };
});
