'use strict';

angular.module('airhostluxeApp')
  .controller('MainCtrl', function ($scope, $http, User) {
    $scope.user;
    $scope.user.photos = [];

    $scope.openPanel=false;

    $http.get('/api/things').success(function(awesomeListings) {
      $scope.awesomeListings = awesomeListings;
    });

    $scope.addListing = function() {
      if($scope.newListing === '') {
        return;
      }
      $http.post('/api/photos', { name: $scope.newPhoto });
      $scope.newPhoto = '';
    };

    $scope.deleteListing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });