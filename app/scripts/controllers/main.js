'use strict';

angular.module('urbanizationVisualizationApp')
  .controller('MainCtrl', function ($scope, Dataset) {


    $scope.periods = ['1950-1955','1955-1960','1960-1965','1965-1970','1970-1975','1975-1980','1980-1985','1985-1990','1990-1995','1995-2000','2000-2005','2005-2010','2010-2015','2015-2020','2020-2025','2025-2030','2030-2035','2035-2040','2040-2045','2045-2050'];
    $scope.selectedPeriod = $scope.periods[0];

    $scope.dataset = [];
    $scope.errors = [];


    $scope.init = function() {
			Dataset.getData().then(function(promise) {
			  console.log(promise.data);
			  $scope.dataset = promise.data;
			  $scope.errors = validate($scope.dataset);
			  console.log($scope.errors);
			  //console.log($scope.dataset);
			});    	
    };


    $scope.init();



    // validate data
    var validate = function(data) {
      var errors = [];
      
      // check if data is array
      if(!data instanceof Array) {
        errors.push({'error': 100, 'message': 'Data is not an array!'});
      }

      // check if data items have a property period of the type string

      // check if data items have a property data of the type array

      // check if data array items have a property cid of the type int

      // check if data array items have a property country of the type string

      // check if data array items have a property pop of the type int

      // check if data array items have a property uGrowth of the type string

      // check if data array items have a property uPop of the type int

      // check if data array items have a property uPopIncrease of the type int

      // check if data array items have a property urbanization of the type string

      return errors;
    };




  });
