'use strict';

angular.module('airhostluxeApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $http, user) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          $http.get('/me').success(function(data) {
            $scope.data = data;
            });
            // Logged in, redirect to home
            $location.path('/'+$scope.data.name+'/properties.html');
          })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
