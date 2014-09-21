'use strict';

angular.module('airhostluxeApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $http, User) {

    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        // .then( function() {
        //   $http.get('/me').success(function(data) {
        //     $scope.data = data;
        //     console.log(data);
        //     });
            // Logged in, redirect to home
          .then( function () {
            $scope.user = Auth.getCurrentUser();
            $location.path($scope.user.name+'/listings.html');
          })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
