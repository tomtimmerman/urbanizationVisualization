'use strict';

angular.module('urbanizationVisualizationApp')
  .service('Dataset', function Dataset($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
/*
		var mainData = null;
		var loadingData = true;

		$http.get('../../datasets/urbanization.json')
			.success(function(data) {
				console.log('success');
				console.log(data);
				mainData = data;
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});

    return {
			data: mainData,
			loadingData: loadingData
    };
*/

		/*
		return {
			data: {},
			loadData: function() {
				self = this; // handle to return object
				$http.get('datasets/urbanization.json')
					.success(function(data) {
						console.log('success');
						//console.log(data);
						self.data = data;
					})
					.error(function(data, status, headers, config) {
						console.log('error');
					});
			},
		};
		*/
		
		/*
		var returnData = {data: null};

		$http.get('datasets/urbanization.json')
			.success(function(data) {
				console.log('success');
				//console.log(data);
				returnData.data = data;
			})
			.error(function(data, status, headers, config) {
				console.log('error');
			});


		return returnData;
		*/


		return {
			getData: function() {
				var promise = $http.get('datasets/urbanization.json')
					//.success(function (data, status, headers, config) {
					.success(function (data) {
						return data;
					})
					//.error(function (data, status, headers, config) {
					.error(function () {
						return {"status": false};
					});

				return promise;
			}
		};




  });
