app.controller('UserController', function ($scope, $http) {
  $scope.items = [];

  $http.get('data.json').then(function (response) {
    $scope.items = response.data;
  });

  $scope.sortBy = 'id';
  $scope.reverse = false;
  $scope.searchKeywords = {
    name: '',
    description: '',
    price: '',
    quantity: ''
  };

  $scope.filteredItems = function () {
    return $scope.items.filter(function (item) {
      var matches = true;
      Object.keys($scope.searchKeywords).forEach(function (key) {
        if ($scope.searchKeywords[key]) {
          var searchValue = $scope.searchKeywords[key].toString().toLowerCase();
          var itemValue = item[key].toString().toLowerCase();
          if (!itemValue.includes(searchValue)) {
            matches = false;
          }
        }
      });
      return matches;
    });
  };

  $scope.isCollapsed = false;
  $scope.toggleCollapse = function () {
    $scope.isCollapsed = !$scope.isCollapsed;
  };
  $scope.addNewItem = function () {
    var newItem = {
      id: $scope.items.length + 1,
      name: 'New Item',
      description: 'description',
      price: 0.00,
      quantity: 0,
      editing: true
    };
    $scope.items.push(newItem);
  };

  $scope.deleteItem = function (item) {
    var index = $scope.items.indexOf(item);
    if (index !== -1) {
      $scope.items.splice(index, 1);
    }
  };

  $scope.sortTable = function (column) {
    if ($scope.sortBy === column) {
      $scope.reverse = !$scope.reverse;
    } else {
      $scope.sortBy = column;
      $scope.reverse = false;
    }
  };
});
