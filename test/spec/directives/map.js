'use strict';

describe('Directive: map', function () {

  // load the directive's module
  beforeEach(module('urbanizationVisualizationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));


  /*
  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<map></map>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the map directive');
  }));
  */



  //element.scope().dataset


  it('should show error if directive has no dataset attribute', inject(function ($compile) {
    element = angular.element('<map display="test"></map>');
    element = $compile(element)(scope);
    //console.log(element.scope().display);
    expect(element.find('span').text()).toBe('This directive should have a dataset attribute!');
  }));


  it('should show error if directive has no display attribute', inject(function ($compile) {
    element = angular.element('<map dataset="[{test:test}]"></map>');
    element = $compile(element)(scope);
    expect(element.find('span').text()).toBe('This directive should have a display attribute!');
  }));






  it('should return the dimensions of the data', inject(function ($compile) {
    element = angular.element('<map dataset="[{val:4},{val:9},{val:3},{val:3},{val:5}]" display="val"></map>');
    element = $compile(element)(scope);
    //console.log(element.scope());
    //console.log(element.scope().getDimensions);
    //console.log(element.scope().getDimensions());

    //var tmp = element.scope().getDimensions;
    var s = element.scope();
    //scope.$apply();
    s.$apply();
    //console.log(s);
    console.log(s.getDimensions());
    expect(s.getDimensions()).toEqual({min:3, max:9});
    //console.log(element.scope().getDimensions());
    //scope.$apply();
    //expect(tmp).toEqual({min:3, max:9});


    //expect(element.scope().getDimensions).toEqual({min:3, max:9});
    //expect(element.scope().getDimensions()).toEqual({min:3, max:9});
    //scope.$apply();
    //console.log('test: '+scope.colors);
    //expect(scope.getDimensions()).toEqual({min:3, max:9});

    //var s = element.scope();
    //s.$apply();
    //console.log('test: '+s.colors);
    //expect(s.getDimensions()).toEqual({min:3, max:9});
  }));








  /*

  should show error if display attribute does not exist


  get data dimentions, return max, min en length?

  

  calculate color scale

  recalculate the color scale if display attribute is changed
  recalculate the color scale if dataset attribute is changed

  Test user intaction:
    click on country


  */


});
