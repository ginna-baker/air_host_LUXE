'use strict';

describe('Controller: CustomizeCtrl', function () {

  // load the controller's module
  beforeEach(module('myAirHostApp'));

  var CustomizeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomizeCtrl = $controller('CustomizeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
