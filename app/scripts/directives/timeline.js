'use strict';

angular.module('urbanizationVisualizationApp')
  .directive('timeline', function () {
    return {
      //template: '<div></div>',
      templateUrl: '../../views/timeline.html',
      replace: true,
      restrict: 'E',
			scope: {
				periods: '=periods',
				at: '=at'
			},
			
      //link: function (scope, element, attrs) {
      link: function (scope, element) {
        //element.text('this is the timeline directive');


        scope.selectedIndex = scope.periods.indexOf(scope.at);

				// 
				scope.select = function(value) {
					scope.selectedIndex = scope.periods.indexOf(value);
					scope.at = value; // return selected period to main controller
				};



        element.find('.line').sortable({
					axis: 'x',
					//containment: "parent",
					//containment: '.line',
					containment: '.timeline',
					cursor: 'move',
					forceHelperSize: true,
					forcePlaceholderSize: true,
					//cursorAt: { left: 5 },
					//grid: [ 20, 10 ],

        });


				scope.$watch('selectedIndex', function (value) {
					//element.slider('option', 'max', value);
					console.log(value);
				});



      }
      
    };
  });
