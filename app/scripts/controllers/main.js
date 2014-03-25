'use strict';

angular.module('urbanizationVisualizationApp')
  .controller('MainCtrl', function ($scope, Dataset) {



/*

	timeline
		play/pause knop
		opmaak


	switch parameter
		bij wisselen uitleg text toevoegen naar welke info je it te kijken

*/






		// 
    $scope.periods = ['1950-1955','1955-1960','1960-1965','1965-1970','1970-1975','1975-1980','1980-1985','1985-1990','1990-1995','1995-2000','2000-2005','2005-2010','2010-2015','2015-2020','2020-2025','2025-2030','2030-2035','2035-2040','2040-2045','2045-2050'];
    $scope.selectedPeriod = $scope.periods[0];
    $scope.dataset = []; // complete dataset
    $scope.periodData = []; // data of the selected period
    $scope.errors = []; // array of errors
    $scope.dataProperty = 'urbanization'; // default value, the property of the dataset that needs to be displayed on the map
    //$scope.min = 0; // minimum value of the periodData set
    //$scope.max = 0; // maximum  value of the periodData set
    $scope.scale = [];



    // initialization function
    $scope.init = function() {
			Dataset.getData().then(function(promise) {
			  $scope.dataset = promise; // receive the dataset
			  $scope.errors = validate($scope.dataset); // validate received data
			  $scope.periodData = getPeriodData($scope.selectedPeriod, $scope.dataset); // get the data of the selected period
			  //$scope.min = getDimensions().min; // set the minimum value of the periodData
			  //$scope.max = getDimensions().max; // set the maximum value of the periodData

			  setScale();
			});
    };

    $scope.init();




    // update datset when selected period is changed
		$scope.$watch('selectedPeriod', function (value) {
			//console.log(value);
			$scope.periodData = getPeriodData(value, $scope.dataset); // get the data of the selected period
		});


		/*
  	// update min and max value if dataProperty changes
		$scope.$watch('dataProperty', function (value) {
		  $scope.min = getDimensions().min; // set the minimum value of the periodData
		  $scope.max = getDimensions().max; // set the maximum value of the periodData
		});
		*/



		// set the data property
		$scope.setDataProperty = function(value) {
			$scope.dataProperty = value;
			setScale();
		};



		var setScale = function() {
			switch($scope.dataProperty) {
				case 'urbanization':
					$scope.scale = [{min: null, max: 20, label: '< 20%', color: '#eff3ff'},{min: 20, max: 40, label: '> 20%', color: '#bdd7e7'},{min: 40, max: 60, label: '> 40%', color: '#6baed6'},{min: 60, max: 80, label: '> 60%', color: '#3182bd'},{min: 80, max: null, label: '> 80%', color: '#08519c'}];
					break;
				case 'uGrowth':
					$scope.scale = [{min: null, max: 0, label: '< 0%', color: '#fcae91'},{min: 0, max: 3, label: '> 0%', color: '#edf8e9'},{min: 3, max: 6, label: '> 3%', color: '#bae4b3'},{min: 6, max: 9, label: '> 6%', color: '#74c476'},{min: 9, max: 12, label: '> 9%', color: '#31a354'},{min: 12, max: null, label: '> 12%', color: '#006d2c'}];
					break;
				default:
					//
			}
		};



		/*
    // returns the dimensions(min and max value) of the dataset
    var getDimensions = function() {
      var min = null,
          max = null;

			for (var i = $scope.dataset.length - 1; i >= 0; i--) {
	      for (var j = $scope.dataset[i].data.length - 1; j >= 0; j--) {
	        if($scope.dataset[i].data[j][$scope.dataProperty] !== null) {
	          if($scope.dataset[i].data[j][$scope.dataProperty] < min || min === null) min = $scope.dataset[i].data[j][$scope.dataProperty];
	          if($scope.dataset[i].data[j][$scope.dataProperty] > max || max === null) max = $scope.dataset[i].data[j][$scope.dataProperty];
	        }
	      }
	    };

      return {'min': min, 'max': max};
    };
    */


    // returns the data of the provided period
    var getPeriodData = function(period, dataset) {
			var data = {};
			for(var i=0; i<dataset.length; i++) {
				if(dataset[i].period === period) {
					data = dataset[i].data;
				}
			}
			return data;
    };


    // validate data
    var validate = function(data) {
      var errors = [];
      var i, j;
      
      // check if data is array
      if(data instanceof Array === false) {
        errors.push({'error': 100, 'message': 'Data is not an array!'});
      }

      // check if data items have a property period of the type string
      if(data.length > 0 && errors[0] !== {'error': 100, 'message': 'Data is not an array!'}) { // 
				for (i = data.length - 1; i >= 0; i--) {
					if(typeof data[i].period === 'undefined') {
						errors.push({'error': 201, 'message': 'Data item has no period property!'});
					} else if(typeof data[i].period !== 'string') {
						errors.push({'error': 202, 'message': 'Data item period property is not a string!'});
					}
				}
      }

      // check if data items have a property data of the type array
      if(data.length > 0 && errors[0] !== {'error': 100, 'message': 'Data is not an array!'}) { // 
				for (i = data.length - 1; i >= 0; i--) {
					if(typeof data[i].data === 'undefined') {
						errors.push({'error': 203, 'message': 'Data item has no data property!'});
					} else if(data[i].data instanceof Array === false) {
						errors.push({'error': 204, 'message': 'Data item data property is not a array!'});
					}
				}
      }

      // check if data array items have a property cid of the type int
      if(data.length > 0 && errors[0] !== {'error': 100, 'message': 'Data is not an array!'}) { // 
				for (i = data.length - 1; i >= 0; i--) {
					if(data[i].data) {
						for (j = data[i].data.length - 1; j >= 0; j--) {
							if(typeof data[i].data[j].cid === 'undefined') {
								errors.push({'error': 301, 'message': 'Item has no cid property!'});
							} else if(typeof data[i].data[j].cid !== 'number') {
								errors.push({'error': 302, 'message': 'Item cid property is not an int!'});
							}
						}
					}
				}
      }

      // check if data array items have a property country of the type string
      if(data.length > 0 && errors[0] !== {'error': 100, 'message': 'Data is not an array!'}) { // 
				for (i = data.length - 1; i >= 0; i--) {
					if(data[i].data) {
						for (j = data[i].data.length - 1; j >= 0; j--) {
							if(typeof data[i].data[j].country === 'undefined') {
								errors.push({'error': 303, 'message': 'Item has no country property!'});
							} else if(typeof data[i].data[j].country !== 'string') {
								errors.push({'error': 304, 'message': 'Item country property is not an string!'});
							}
						}
					}
				}
      }

      // check if data array items have a property pop of the type int
      if(data.length > 0 && errors[0] !== {'error': 100, 'message': 'Data is not an array!'}) { // 
				for (i = data.length - 1; i >= 0; i--) {
					if(data[i].data) {
						for (j = data[i].data.length - 1; j >= 0; j--) {
							if(typeof data[i].data[j].pop === 'undefined') {
								errors.push({'error': 305, 'message': 'Item has no pop property!'});
							} else if(typeof data[i].data[j].pop !== 'number') {
								errors.push({'error': 306, 'message': 'Item pop property is not an int!'});
							}
						}
					}
				}
      }

      // check if data array items have a property uGrowth of the type string
      if(data.length > 0 && errors[0] !== {'error': 100, 'message': 'Data is not an array!'}) { // 
				for (i = data.length - 1; i >= 0; i--) {
					if(data[i].data) {
						for (j = data[i].data.length - 1; j >= 0; j--) {
							if(typeof data[i].data[j].uGrowth === 'undefined') {
								errors.push({'error': 307, 'message': 'Item has no uGrowth property!'});
							} else if(typeof data[i].data[j].uGrowth !== 'string') {
								errors.push({'error': 308, 'message': 'Item uGrowth property is not an string!'});
							}
						}
					}
				}
      }

      // check if data array items have a property uPop of the type int
      if(data.length > 0 && errors[0] !== {'error': 100, 'message': 'Data is not an array!'}) { // 
				for (i = data.length - 1; i >= 0; i--) {
					if(data[i].data) {
						for (j = data[i].data.length - 1; j >= 0; j--) {
							if(typeof data[i].data[j].uPop === 'undefined') {
								errors.push({'error': 309, 'message': 'Item has no uPop property!'});
							} else if(typeof data[i].data[j].uPop !== 'number') {
								errors.push({'error': 310, 'message': 'Item uPop property is not an int!'});
							}
						}
					}
				}
      }

      // check if data array items have a property uPopIncrease of the type int
      if(data.length > 0 && errors[0] !== {'error': 100, 'message': 'Data is not an array!'}) { // 
				for (i = data.length - 1; i >= 0; i--) {
					if(data[i].data) {
						for (j = data[i].data.length - 1; j >= 0; j--) {
							if(typeof data[i].data[j].uPopIncrease === 'undefined') {
								errors.push({'error': 311, 'message': 'Item has no uPopIncrease property!'});
							} else if(typeof data[i].data[j].uPopIncrease !== 'number') {
								errors.push({'error': 312, 'message': 'Item uPopIncrease property is not an int!'});
							}
						}
					}
				}
      }

      // check if data array items have a property urbanization of the type string
      if(data.length > 0 && errors[0] !== {'error': 100, 'message': 'Data is not an array!'}) { // 
				for (i = data.length - 1; i >= 0; i--) {
					if(data[i].data) {
						for (j = data[i].data.length - 1; j >= 0; j--) {
							if(typeof data[i].data[j].urbanization === 'undefined') {
								errors.push({'error': 313, 'message': 'Item has no urbanization property!'});
							} else if(typeof data[i].data[j].urbanization !== 'string') {
								errors.push({'error': 314, 'message': 'Item urbanization property is not an string!'});
							}
						}
					}
				}
      }

      return errors;
    };


  });
