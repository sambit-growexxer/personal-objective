app.controller('HeaderController', function($scope, $location) {
    $scope.menuOptions = [
      { label: 'Home', link: '#!/home' },
      { label: 'Shipment', link: '#!/shipment' },
      { label: 'Warehouse', link: '#!/warehouse' },
      { label: 'Orders', link: '#!/orders' }

    ];

    $scope.userOptions = [
      { label: 'Sign Out', action: 'signOut' }
    ];

    $scope.isLoggedIn = !!localStorage.getItem('jwtToken');

    $scope.performAction = function(action) {
        if (action === 'signOut') {
          localStorage.removeItem('jwtToken');
          $scope.isLoggedIn = false;
          $location.path('/login');
        }
      };
  });
  