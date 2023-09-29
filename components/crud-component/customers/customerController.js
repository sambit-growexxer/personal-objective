app.controller('CustomerController', function ($scope, $http) {
    $scope.customers = [];

    $http.get('customers.json').then(function (response) {
        $scope.customers = response.data;
    });

    $scope.sortBy = 'customerID';
    $scope.reverse = false;
    $scope.searchKeywords = {
        name: '',
        email: '',
        phone: '',
        address: ''
    };

    $scope.filteredCustomers = function () {
        return $scope.customers.filter(function (customer) {
            var matches = true;
            Object.keys($scope.searchKeywords).forEach(function (key) {
                if ($scope.searchKeywords[key]) {
                    var searchValue = $scope.searchKeywords[key].toString().toLowerCase();
                    var customerValue = customer[key].toString().toLowerCase();
                    if (!customerValue.includes(searchValue)) {
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

    $scope.addNewCustomer = function () {
        var newCustomer = {
            customerID: $scope.customers.length + 1,
            name: 'New Customer',
            email: 'new@example.com',
            phone: '123-456-7890',
            address: 'New Address',
            editing: true
        };
        $scope.customers.push(newCustomer);
    };

    $scope.editCustomer = function (customer) {
        customer.editing = true;
    };

    $scope.saveCustomer = function (customer) {
        customer.editing = false;
    };

    $scope.deleteCustomer = function (customer) {
        var index = $scope.customers.indexOf(customer);
        if (index !== -1) {
            $scope.customers.splice(index, 1);
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
