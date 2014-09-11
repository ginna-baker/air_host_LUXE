'use strict';

describe('Controller: CustctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('myAirHostApp'));

  var CustctrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustctrlCtrl = $controller('CustctrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
