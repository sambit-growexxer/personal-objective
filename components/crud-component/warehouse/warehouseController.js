app.controller('WarehouseController', function ($scope, $http) {
    $scope.warehouses = [];

    $http.get('warehouse.json').then(function (response) {
        $scope.warehouses = response.data;
    });

    $scope.sortBy = 'warehouseID';
    $scope.reverse = false;
    $scope.searchKeywords = {
        location: '',
        capacity: '',
        inventory: '',
        staff: ''
    };

    $scope.filteredWarehouses = function () {
        return $scope.warehouses.filter(function (warehouse) {
            var matches = true;
            Object.keys($scope.searchKeywords).forEach(function (key) {
                if ($scope.searchKeywords[key]) {
                    var searchValue = $scope.searchKeywords[key].toString().toLowerCase();
                    var warehouseValue = warehouse[key].toString().toLowerCase();
                    if (!warehouseValue.includes(searchValue)) {
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

    $scope.addNewWarehouse = function () {
        var newWarehouse = {
            warehouseID: $scope.warehouses.length + 1,
            location: 'New Location',
            capacity: 0,
            inventory: 'New Inventory',
            staff: 'New Staff',
            editing: true
        };
        $scope.warehouses.push(newWarehouse);
    };

    $scope.editWarehouse = function (warehouse) {
        warehouse.editing = true;
    };

    $scope.saveWarehouse = function (warehouse) {
        warehouse.editing = false;
    };

    $scope.deleteWarehouse = function (warehouse) {
        var index = $scope.warehouses.indexOf(warehouse);
        if (index !== -1) {
            $scope.warehouses.splice(index, 1);
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
