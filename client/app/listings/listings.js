'use strict';

angular.module('myAirHostApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:user/listings', {
        templateUrl: 'app/listings/listings.html',
        controller: 'ListingsCtrl'
      });
  });
