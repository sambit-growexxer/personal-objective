app.controller('OrderController', function ($scope, $http) {
    $scope.orders = [];

    $http.get('orders.json').then(function (response) {
        $scope.orders = response.data;
    });

    $scope.sortBy = 'orderID';
    $scope.reverse = false;
    $scope.searchKeywords = {
        customer: '',
        product: ''
    };

    $scope.filteredOrders = function () {
        return $scope.orders.filter(function (order) {
            var matches = true;
            Object.keys($scope.searchKeywords).forEach(function (key) {
                if ($scope.searchKeywords[key]) {
                    var searchValue = $scope.searchKeywords[key].toString().toLowerCase();
                    var orderValue = order[key].toString().toLowerCase();
                    if (!orderValue.includes(searchValue)) {
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

    $scope.addNewOrder = function () {
        var newOrder = {
            orderID: $scope.orders.length + 1,
            customer: 'New Customer',
            product: 'New Product',
            quantity: 0,
            totalAmount: 0.00,
            editing: true
        };
        $scope.orders.push(newOrder);
    };

    $scope.editOrder = function (order) {
        order.editing = true;
    };

    $scope.saveOrder = function (order) {
        order.editing = false;
    };

    $scope.deleteOrder = function (order) {
        var index = $scope.orders.indexOf(order);
        if (index !== -1) {
            $scope.orders.splice(index, 1);
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
