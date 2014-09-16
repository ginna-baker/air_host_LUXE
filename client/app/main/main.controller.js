'use strict';

angular.module('airhostluxeApp')
  .controller('MainCtrl', function ($scope, $http, User) {
    $scope.user;

    $scope.openPanel=false;

    $http.get('/api/listings').success(function(listings) {
      $scope.listings = listings;
    });

    $scope.addListing = function() {
      if($scope.newListing === '') {
        return;
      }
      $http.post('/api/photos', { name: $scope.newPhoto });
      $scope.newPhoto = '';
    };

    $scope.deleteListing = function(listing) {
      $http.delete('/api/listings/' + listing._id);
    };
  });