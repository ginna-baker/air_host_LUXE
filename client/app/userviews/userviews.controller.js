'use strict';

angular.module('airhostluxeApp')
  .controller('UserviewsCtrl', function ($scope, $http, $route) {

    var id = $route.current.params;
    for (var key in id) {
      $scope.idVal = id[key];
      console.log($scope.idVal);
    }

      $http.get('/api/listing/' + $scope.idVal).
        success(function(data) {
          $scope.listing = data;
          console.log($scope.listing);
        });

  });
