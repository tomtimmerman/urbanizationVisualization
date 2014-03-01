'use strict';

describe('Service: Dataset', function () {

  // load the service's module
  beforeEach(module('urbanizationVisualizationApp'));

  // instantiate service
  var Dataset, $httpBackend;

  beforeEach(inject(function (_Dataset_, _$httpBackend_) {
    Dataset = _Dataset_;
    $httpBackend = _$httpBackend_;
  }));

  /*
  it('should do something', function () {
    expect(!!Dataset).toBe(true);
  });
  */

  it('should receive the fulfilled promise', function () {
    $httpBackend.expectGET('datasets/urbanization.json').respond([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]);

    var receivedData;
    Dataset.getData().then(function(promise) {
      receivedData = promise;
    });

    $httpBackend.flush();
    
    expect(receivedData).toEqual([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]);
  });

/*
  it('should get an error if received data is not an array', function () {
    $httpBackend.expectGET('datasets/urbanization.json').respond({'test': 'test'});

    var receivedData;
    Dataset.getData().then(function(promise) {
      receivedData = promise.data;
    });

    $httpBackend.flush();

    expect(receivedData).toEqual({'error': 100, 'message': 'Data is not an array!'});
  });


  it('should get an error if array items don't have a period propery of the type string, function () {
    $httpBackend.expectGET('datasets/urbanization.json').respond([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]);

    var receivedData;
    Dataset.getData().then(function(promise) {
      receivedData = promise.data;
    });

    $httpBackend.flush();

    expect(typeof receivedData[0].period).toEqual('string');
  });


  it('should get an error if array items don't have a data propery of the type array', function () {
    $httpBackend.expectGET('datasets/urbanization.json').respond([{'period': '1950-1955', 'data': [{'cid': 682, 'country': 'Saudi Arabia', 'pop': 24041, 'uGrowth': '3,92', 'uPop': 19468, 'uPopIncrease': 3462, 'urbanization': '81,0'},{'cid': 784, 'country': 'United Arab Emirates', 'pop': 4069, 'uGrowth': '6,37', 'uPop': 3348, 'uPopIncrease': 914, 'urbanization': '82,3'}]},{'period': '1955-1960', 'data': [{'cid': 520, 'country': 'Nauru', 'pop': 11, 'uGrowth': '0,42', 'uPop': 11, 'uPopIncrease': 0, 'urbanization': '100,0'},{'cid': 36, 'country': 'Australia', 'pop': 25241, 'uGrowth': '1,32', 'uPop': 22813, 'uPopIncrease': 1453, 'urbanization': '90,4'}]}]);

    var receivedData;
    Dataset.getData().then(function(promise) {
      receivedData = promise.data;
    });

    $httpBackend.flush();

    expect(receivedData[0].data instanceof Array).toBe(true);
  });


  it('', function () {
    expect(!!Dataset).toBe(true);
  });

  it('should ', function () {
    expect(!!Dataset).toBe(true);
  });
  */





});
