'use strict';

angular.module('airhostluxeApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.user = Auth.getCurrentUser();

    $scope.menu = [{
      'title': 'Why Luxe?',
      'link': '/why_luxe'
      },
      {'title': 'Listings',
      'link': $scope.user.name + '/listings'
      },
      {'title': 'Get Started',
      'link': $scope.user.name + '/new'
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });