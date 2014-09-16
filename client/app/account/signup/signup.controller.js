'use strict';

angular.module('airhostluxeApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $http, User) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          $http.get('/me').success(function(data) {
            $scope.data = data;
            });
            // Logged in, redirect to home
            $location.path('/'+$scope.data.name+'/listings.html');
          })

        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
