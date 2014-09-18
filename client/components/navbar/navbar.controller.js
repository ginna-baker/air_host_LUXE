'use strict';

angular.module('airhostluxeApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, User) {

    $scope.user = Auth.getCurrentUser();

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
      },
      {'title': 'Why Luxe?',
      'link': '/why_luxe'
      },
      {'title': 'Listings',
      'link': $scope.user.name + '/listings'
      },
      {'title': 'New Listing',
      'link': $scope.user.name + '/new'
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });