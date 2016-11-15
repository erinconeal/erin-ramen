angular.module('myApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl',
    url: '/',
    resolve: {
      food: function(mainService){
        return mainService.getMenu();
      }
    }
  })
  .state('contact', {
    templateUrl: 'contact/contact_map.html',
    controller: 'contactCtrl',
    url: '/contact'
  })
  .state('order', {
    templateUrl: 'order/order_main.html',
    controller: 'orderCtrl',
    url: '/order'
  })
  .state('delivery', {
    templateUrl: '/order/delivery/delivery.html',
    controller: 'deliveryCtrl',
    url: '/delivery'
  })
  .state('pickup', {
    templateUrl: '/order/pickup/pickup.html',
    controller: 'pickupCtrl',
    url: '/pickup',
    resolve: {
      food: function(mainService){
        return mainService.getMenu();
      }
      // ,
      // tableId: function(mainService, phoneNum){
      //   return mainService.orderTableId(phoneNum);
      // }
    }
  })
  .state('submitted', {
    templateUrl: '/order/submitted/submit.html',
    controller: 'submitCtrl',
    url: '/submitted',
    resolve: {
      orders: function(mainService) {
        return mainService.getCustOrder();
      }
    }
  })
  .state('login', {
    templateUrl: '/admin/login/admin_login.html',
    controller: 'loginCtrl',
    url: '/login'
  })
  .state('logout', {
    templateUrl: '/admin/login/admin_login.html',
    controller: 'loginCtrl',
    url: '/login'
  })
  .state('admin', {
    templateUrl: '/admin/admin_main.html',
    controller: 'adminCtrl',
    url: '/admin',
    resolve: {
				user: function(mainService, $state) {
					return mainService.getCurrentUser()
						.then(function(response) {
							if (!response.data)
								$state.go('login');
							return response.data;
						})
						.catch(function(err) {
							$state.go('login');
						});
				}
			}
  })
  .state('orderSum', {
    templateUrl: '/admin/orders_sum/admin_orders_summary.html',
    controller: 'admin_ordersCtrl',
    url: '/ordersummary',
    resolve: {
      orders: function(adminSrv) {
        return adminSrv.getOrderstoFill();
      }
    }
  })
  .state('updateMenu', {
    templateUrl: '/admin/update_menu/admin_update_menu.html',
    controller: 'admin_update_menuCtrl',
    url: '/updatemenu',
    resolve: {
      food: function(mainService){
        return mainService.getMenu();
      },
      categories: function(mainService) {
        return mainService.GetAllCategories();
      }
    }
  })
  .state('editmenuitem', {
    templateUrl: '/admin/update_menu/editMenu.html',
    controller: 'editMenuCtrl',
    url: '/editmenuitem/:id',
    resolve: {
      item: function(mainService, $stateParams) {
        return mainService.getOneMenuItem($stateParams.id)
      },
      categories: function(mainService) {
        return mainService.GetAllCategories();
      }
    }
  })
});
