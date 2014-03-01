'use strict';

angular.module('urbanizationVisualizationApp')
  .controller('MainCtrl', function ($scope, Dataset) {


    $scope.periods = ['1950-1955','1955-1960','1960-1965','1965-1970','1970-1975','1975-1980','1980-1985','1985-1990','1990-1995','1995-2000','2000-2005','2005-2010','2010-2015','2015-2020','2020-2025','2025-2030','2030-2035','2035-2040','2040-2045','2045-2050'];
    $scope.selectedPeriod = $scope.periods[0];

    $scope.dataset = [];
    $scope.errors = [];


    $scope.init = function() {
			Dataset.getData().then(function(promise) {
			  //console.log(promise);
			  $scope.dataset = promise;
			  $scope.errors = validate($scope.dataset);
			  //console.log($scope.errors);
			  //console.log($scope.dataset);
			});
    };

    $scope.init();



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
