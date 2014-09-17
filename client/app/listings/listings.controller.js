'use strict';

angular.module('airhostluxeApp')
  .controller('ListingsCtrl', function ($scope, $http, Auth, User) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.user = Auth.getCurrentUser;

    $http.get('api/users/me').success(function(data) {
      $scope.data = data;
    });

    $scope.editSite = function(id) {
      $location.path("/")
    }

    $http.get('/api/listings').success(function(listings) {
      $scope.listings = listings;
    });

    $scope.addListing = function() {
      if($scope.newListing === '') {
        return;
      }


    });
