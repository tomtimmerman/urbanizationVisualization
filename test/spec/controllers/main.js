'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('urbanizationVisualizationApp'));

  var MainCtrl,
    scope,
    Dataset, 
    deferred,
    q;

  // define the mock service
  beforeEach(inject(function ($q) {
    q = $q;

    Dataset = {
      getData: function() {
        deferred = $q.defer();
        return deferred.promise;
      }
    }
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      Dataset: Dataset
    });
  }));

  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
  */


  describe("Data validation:", function() {





    beforeEach(inject(function() {
      

    }));



    it('should call getData on the Dataset service when init is called', inject(function ($compile) {
        spyOn(Dataset, 'getData').andCallThrough();

        scope.init();

        deferred.resolve({'test': 'test'});

        scope.$root.$digest();

        expect(Dataset.getData).toHaveBeenCalled();
    }));



    it('should get an error if received data is not an array', inject(function ($compile) {
      
      scope.init();

      deferred.resolve({'test': 'test'});

spyOn(Dataset, 'getData').andReturn(deferred.promise);

      scope.$root.$digest();

      //expect(scope.peopleList).not.toBe([]);
      
      //scope.$apply();
      //expect(scope.errors).toEqual({'error': 100, 'message': 'Data is not an array!'});
      expect(scope.dataset).toEqual({'error': 100, 'message': 'Data is not an array!'});
    }));

  

/*
    it('should get an error if array items dont have a period propery of the type string', function () {

    }));


    it('should get an error if array items dont have a data propery of the type array', function () {

    }));
*/


  });



});
