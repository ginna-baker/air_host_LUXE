'use strict';

angular.module('myAirHostApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:user/:listing/customize/', {
        templateUrl: 'app/customize/customize.html',
        controller: 'CustomizeCtrl'
      });
  });
