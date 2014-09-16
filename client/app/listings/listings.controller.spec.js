'use strict';

describe('Controller: ListingsCtrl', function () {

  // load the controller's module
  beforeEach(module('airhostluxeApp'));

  var ListingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListingsCtrl = $controller('ListingsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
