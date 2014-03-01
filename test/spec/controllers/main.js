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
    };
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

    periods
    selectedPeriod

  */



  describe('Data validation:', function() {

    it('should call getData on the Dataset service when init is called', inject(function ($compile) {
      spyOn(Dataset, 'getData').andCallThrough();
      scope.init();
      deferred.resolve({'test': 'test'}); // resolve promise
      scope.$root.$digest();
      expect(Dataset.getData).toHaveBeenCalled();
    }));

    it('should get an error if received data is not an array', inject(function ($compile) {
      scope.init();
      deferred.resolve({'test': 'test'}); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 100, 'message': 'Data is not an array!'}]);
    }));

    it('should get an error if array items dont have a period property', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 201, 'message': 'Data item has no period property!'}]);
    });

    it('should get an error if array items period property in not a string', function () {
      scope.init();
      deferred.resolve([{'period': 1950, 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 202, 'message': 'Data item period property is not a string!'}]);
    });

    it('should get an error if array items dont have a data property', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960'}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 203, 'message': 'Data item has no data property!'}]);
    });

    it('should get an error if array items data property in not a array', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': {'test':'test'}}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 204, 'message': 'Data item data property is not a array!'}]);
    });

    it('should get an error if data array items dont have a cid property', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 301, 'message': 'Item has no cid property!'}]);
    });

    it('should get an error if data array items cid property is not a int', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': '36', 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 302, 'message': 'Item cid property is not an int!'}]);
    });

    it('should get an error if data array items dont have a country property', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 303, 'message': 'Item has no country property!'}]);
    });

    it('should get an error if data array items country property is not a int', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 12, 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 304, 'message': 'Item country property is not an string!'}]);
    });

    it('should get an error if data array items dont have a pop property', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 305, 'message': 'Item has no pop property!'}]);
    });

    it('should get an error if data array items pop property is not a int', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': '11', 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 306, 'message': 'Item pop property is not an int!'}]);
    });

    it('should get an error if data array items dont have a uGrowth property', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 307, 'message': 'Item has no uGrowth property!'}]);
    });

    it('should get an error if data array items uGrowth property is not a string', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': 12, 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 308, 'message': 'Item uGrowth property is not an string!'}]);
    });

    it('should get an error if data array items dont have a uPop property', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 309, 'message': 'Item has no uPop property!'}]);
    });

    it('should get an error if data array items uPop property is not a int', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': '22813', 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 310, 'message': 'Item uPop property is not an int!'}]);
    });

    it('should get an error if data array items dont have a uPopIncrease property', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 311, 'message': 'Item has no uPopIncrease property!'}]);
    });

    it('should get an error if data array items uPopIncrease property is not a int', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': '1453', 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 312, 'message': 'Item uPopIncrease property is not an int!'}]);
    });

    it('should get an error if data array items dont have a urbanization property', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 313, 'message': 'Item has no urbanization property!'}]);
    });

    it('should get an error if data array items urbanization property is not a int', function () {
      scope.init();
      deferred.resolve([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': 81},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]); // resolve promise
      scope.$root.$digest();
      expect(scope.errors).toEqual([{'error': 314, 'message': 'Item urbanization property is not an string!'}]);
    });


  });



});
