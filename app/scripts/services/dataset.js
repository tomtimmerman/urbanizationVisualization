'use strict';

angular.module('urbanizationVisualizationApp')
  .service('Dataset', function Dataset($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    

		return {
			getData: function() {
				var deferred = $q.defer();
				$http.get('datasets/urbanization.json')
					.success(function(data){
						deferred.resolve(data);
					})
					.error(function () {
						deferred.resolve({'status': 'error'});
					});
				return deferred.promise;
			}
		};




  });
