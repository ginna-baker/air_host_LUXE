'use strict';

angular.module('airhostluxeApp')
  .controller('FrontlistingsCtrl', function ($scope, $http, Auth) {
        console.log("working");

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.user = Auth.getCurrentUser();

    $scope.editSite = function() {
      $location.path("/");
    };

    $http.get('/api/listing/foruser/'+$scope.user._id).success(function(listings) {
      debugger;
      $scope.listings = listings;
      console.log($scope.listings);
    });


    // $scope.addListing = function() {
    //   if($scope.newListing === '') {
    //     return;
    //   }
    // };
  });
