'use strict';

angular.module('airhostluxeApp')
  .factory('storage', function (User) {
    // Service logic
    // ...
    $http.get('/me').success(function(data) {
      $scope.data = data;
    });

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
