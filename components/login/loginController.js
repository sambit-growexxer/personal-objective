app.controller('LoginController', function ($scope, $http, $location, $interval) {
  $scope.username = '';
  $scope.password = '';
  $scope.errorMessage = '';

  let sessionTimeoutInterval;
  let lastActivityTime;

  $scope.login = function () {
    $http.get('users.json').then(function (response) {
      let users = response.data;

      let user = users.find(function (user) {
        return user.email === $scope.username;
      });

      if (user && user.password === $scope.password) {
        lastActivityTime = Date.now();

        let token = generateToken(user.email);

        localStorage.setItem('jwtToken', token);

        startSessionTimeout();

        $location.path('/home');
      } else {
        $scope.errorMessage = 'Invalid username or password.';
      }
    });
  };

  function generateToken(email) {
    let expiration = new Date(Date.now() + 5 * 60 * 1000);
    let token = email + '|' + expiration.toISOString();
    return token;
  }

  function startSessionTimeout() {
    if (sessionTimeoutInterval) {
      $interval.cancel(sessionTimeoutInterval);
    }

    sessionTimeoutInterval = $interval(checkSessionTimeout, 1000);
  }

  function checkSessionTimeout() {
    if (lastActivityTime && Date.now() - lastActivityTime > 5 * 60 * 1000) {
      localStorage.removeItem('jwtToken');
      $interval.cancel(sessionTimeoutInterval);
      $location.path('/login');
    }
  }

  angular.element(document).on('keydown click', function () {
    lastActivityTime = Date.now();
    $scope.$apply();
  });
});
