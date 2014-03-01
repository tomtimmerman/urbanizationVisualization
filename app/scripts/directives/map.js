'use strict';

angular.module('urbanizationVisualizationApp')
  .directive('map', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
        dataset: '=dataset',
      },
      replace: true,
      link: function (scope, element, attrs) {
        element.text('this is the map directive');
        

      

        //Dataset.loadData();
        //console.log(Dataset.data);
        //scope.data = [];

/*
        Dataset.getData().then(function(promise) {
          //scope.revenues = promise;
          
          console.log(promise.data);

          var result = validate(promise.data);
          console.log(result);
          scope.dataset = result;

        });
*/


/*
        scope.errors = []; 

        scope.$watch('dataset', function (data) {
          //console.log(data);
          console.log(validate(data));
          //scope.errors = validate(data);
        });
*/





      }
    };
  });
