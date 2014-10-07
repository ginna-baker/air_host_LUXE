'use strict';

describe('Controller: FrontlistingsCtrl', function () {

  // load the controller's module
  beforeEach(module('airhostluxeApp'));

  var FrontlistingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FrontlistingsCtrl = $controller('FrontlistingsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
