app.controller('ShipmentController', function ($scope, $http) {
    $scope.shipments = [];

    $http.get('shpimentData.json').then(function (response) {
        $scope.shipments = response.data;
    });

    $scope.sortBy = 'shipmentID';
    $scope.reverse = false;
    $scope.searchKeywords = {
        sender: '',
        receiver: '',
        status: ''
    };

    $scope.filteredShipments = function () {
        return $scope.shipments.filter(function (shipment) {
            var matches = true;
            Object.keys($scope.searchKeywords).forEach(function (key) {
                if ($scope.searchKeywords[key]) {
                    var searchValue = $scope.searchKeywords[key].toString().toLowerCase();
                    var shipmentValue = shipment[key].toString().toLowerCase();
                    if (!shipmentValue.includes(searchValue)) {
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

    $scope.addNewShipment = function () {
        var newShipment = {
            shipmentID: $scope.shipments.length + 1,
            sender: 'New Sender',
            receiver: 'New Receiver',
            status: 'Pending',
            editing: true
        };
        $scope.shipments.push(newShipment);
    };

    $scope.editShipment = function (shipment) {
        shipment.editing = true;
    };

    $scope.saveShipment = function (shipment) {
        shipment.editing = false;
    };

    $scope.deleteShipment = function (shipment) {
        var index = $scope.shipments.indexOf(shipment);
        if (index !== -1) {
            $scope.shipments.splice(index, 1);
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
