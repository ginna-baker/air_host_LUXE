'use strict';

angular.module('airhostluxeApp')
  .controller('CustomizeCtrl', function ($scope, $http, Auth, User) {

    $scope.isLoggedIn = Auth.isLoggedIn;

    console.log("test");

    $http.get('/me').success(function(data) {
      $scope.data = data;
    });

    $scope.step=1;

    $scope.back = function () {
      $scope.step--;
    };

    $scope.advance = function () {
      $scope.step++;
    };


  });
