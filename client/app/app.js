'use strict';

angular.module('airhostluxeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'flow'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider, flowFactoryProvider) {
    $routeProvider
      .when('/whyluxe', {
        templateUrl: 'app/why_luxe.html',
        controller: 'MainCtrl'
      })
      .when('/:user/listings', {
        templateURL: 'app/listings/listings.html',
        controller: 'ListingsCtrl',
        authenticate: true
      })
      .when('/:user/:listing/customize', {
        templateURL: 'app/customize/customize.html',
        controller: 'CustomizeCtrl',
        authenticate: true
      })
      .when('/:user/:listing', {
        templateUrl: 'app/assets/oceanica/html/index.html',
        controller: 'MainCtrl'
      })
      // .when('/:user/:listing/my_stay', {
      //   templateUrl: 'app/my_stay.html',
      //   controller: 'MainCtrl'
      // })
      // .when('/:user/:listing/what_to_do', {
      //   templateUrl: 'app/what_to_do.html',
      //   controller: 'MainCtrl'
      // })
      // .when('/:user/:listing/where_to_eat', {
      //   templateUrl: 'app/where_to_eat.html',
      //   controller: 'MainCtrl'
      // })
      // .when('/:user/:listing/emergency', {
      //   templateUrl: 'app/emergency.html',
      //   controller: 'MainCtrl'
      // })
      // .when('/:user/:listing/xpage1', {
      //   templateUrl: 'app/extra_page_1.html',
      //   controller: 'MainCtrl'
      // })
      // .when('/:user/:listing/xpage2', {
      //   templateUrl: 'app/extra_page_2.html',
      //   controller: 'MainCtrl'
      // })
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    flowFactoryProvider.defaults = {
        target: '/:user/:listing/photos',
        permanentErrors:[404, 500, 501]
    };
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });