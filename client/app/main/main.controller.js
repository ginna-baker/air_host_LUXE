'use strict';

angular.module('myAirHostApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.user;
    $scope.user.photos = [];

    $scope.openPanel=false;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/photos', { name: $scope.newPhoto });
      $scope.newPhoto = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });