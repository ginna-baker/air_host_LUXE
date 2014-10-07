'use strict';

describe('Controller: UserviewsCtrl', function () {

  // load the controller's module
  beforeEach(module('airhostluxeApp'));

  var UserviewsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserviewsCtrl = $controller('UserviewsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
