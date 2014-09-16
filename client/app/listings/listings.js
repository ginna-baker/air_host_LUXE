'use strict';

angular.module('airhostluxeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:user/listings', {
        templateUrl: 'app/listings/listings.html',
        controller: 'ListingsCtrl'
      });
  });
