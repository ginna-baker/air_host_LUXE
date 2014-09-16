'use strict';

angular.module('airhostluxeApp')
  .controller('ListingsCtrl', function ($scope, $http, Auth, User) {
    $scope.message = 'Hello';

    if (isLoggedIn() === true) {
      $scope.loggedIn = true;
    }

    $http.get('/me').success(function(data) {
      $scope.data = data;
    });

    });
