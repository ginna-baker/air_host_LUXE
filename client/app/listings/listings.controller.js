'use strict';

angular.module('airhostluxeApp')
  .controller('ListingsCtrl', function ($scope, $location, $http, Auth) {

    console.log("working");
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.user = Auth.getCurrentUser();

    $scope.editSite = function(id) {
      $location.path("/");
    };

    $http.get('/api/listing').success(function(listings) {
      $scope.listings = listings;
    });

    $scope.addListing = function() {
      if($scope.newListing === '') {
        return;
      }
    };

    });