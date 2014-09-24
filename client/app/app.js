'use strict';

angular.module('airhostluxeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'flow'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/why_luxe', {
        templateUrl: '/app/why_luxe.html',
        controller: 'MainCtrl'
      })
      .when('/:user/new/', {
        templateUrl: '/app/customize/customize.html',
        controller: 'CustomizeCtrl'
      })
      .when('/:user/frontlistings', {
        templateUrl: '/app/frontlistings/frontlistings.html',
        controller: 'FrontlistingsCtrl'
      })
      .when('/:user/:listing/view', {
        templateUrl: '/assets/oceanica/html/index.html',
        controller: 'MainCtrl'
      })
      .when('/', {
        templateUrl: '/app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
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