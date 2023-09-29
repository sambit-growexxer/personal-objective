var app = angular.module('myApp', ['ngRoute']);

function checkLoggedIn($location) {
  if (!localStorage.getItem('jwtToken')) {
    $location.path('/login');
  }
}

app.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'components/login/loginView.html',
      controller: 'LoginController',
      resolve: {
        checkAuth: function ($location) {
          if (localStorage.getItem('jwtToken')) {
            $location.path('/home');
          }
        }
      }
    })
    .when('/', {
      templateUrl: 'components/login/loginView.html',
      controller: 'LoginController'
    })
    .when('/home', {
      templateUrl: 'components/crud-component/userView.html',
      controller: 'UserController',
      resolve: {
        checkLoggedIn: checkLoggedIn
      }
    })
    .when('/shipment', {
      templateUrl: 'components/crud-component/shipments/shipmentView.html',
      controller: 'ShipmentController',
      resolve: {
        checkLoggedIn: checkLoggedIn
      }
    })
    .when('/warehouse', {
      templateUrl: 'components/crud-component/warehouse/warehouseView.html',
      controller: 'ShipmentController',
      resolve: {
        checkLoggedIn: checkLoggedIn
      }
    })
    .when('/other', {
      templateUrl: 'components/other/otherView.html',
      controller: 'OtherController',
      resolve: {
        checkLoggedIn: checkLoggedIn
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
});
