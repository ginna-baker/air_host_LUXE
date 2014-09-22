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

    var scrape = function() {
      $http.get('/scrape', function () {
        var url = $scope.listing.property_info.airbnb_url;
      }).success(function(data) {
        var scraped = data;
        $scope.postObj.property_info.photo = data.cover;
        $scope.postObj.property_info.airbnb_rating=data.airbnb_rating;
        $scope.postObj.property_info.city=data.city;
        // var url_id = $scope.generateUrlCode();
        // $http.post('/api/listings').success(function() {
        //   $scope.step++;
        });
    };

  // $scope.generateUrlCode = function() {
  //   return Math.random().toString(36).substring(2,7);
  // };

  });
