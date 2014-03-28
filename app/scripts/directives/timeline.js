'use strict';

angular.module('urbanizationVisualizationApp')
  .directive('timeline', function ($interval) {
    return {
      //template: '<div></div>',
      templateUrl: '../../views/timeline.html',
      replace: true,
      restrict: 'E',
			scope: {
				startDate: '=startdate',
				endDate: '=enddate',
				periodLength: '=periodlength',
				selectedPeriod: '=selectedperiod'
			},
			
      //link: function (scope, element, attrs) {
      link: function (scope, element) {
        //element.text('this is the timeline directive');


        var timer,
        		play = false;

        scope.years = []; // year labels
        scope.periods = []; // period names


        // populate years and periods arrays
        for (var i = 0; i < ((scope.endDate-scope.startDate)/scope.periodLength)+1; i++) { 
        	scope.years.push(scope.startDate+(scope.periodLength*i)); // generate array with year labels
        	var periodName = scope.startDate+(scope.periodLength*i)+'-'+(scope.startDate+(scope.periodLength*(i+1))) // set period name
        	if(i < ((scope.endDate-scope.startDate)/scope.periodLength)) scope.periods.push(periodName); // generate array with period names
        };

        //console.log(scope.periods);


        //scope.selectedIndex = scope.periods.indexOf(scope.at);

				// 
				scope.select = function(value) {
					//scope.selectedIndex = scope.periods.indexOf(value);
					//scope.at = value; // return selected period to main controller
					console.log(value);
					scope.selectedPeriod = value;
				};


				//
				scope.play = function() {
					


					if(play === false) {
						//console.log('play');
						// glyphicon glyphicon-pause
						play = true;
						timer = $interval(setNextPeriod, 500);
					} else {
						//console.log('pause');
						play = false;
						$interval.cancel(timer);
					}

					//console.log(getIndex(scope.selectedPeriod));
				};

				
				//
				var setNextPeriod = function() {

					var index = getIndex(scope.selectedPeriod);
					//console.log(index);
					
					if((index+1) >= scope.periods.length) { // check if next index exists
						// last period in array
						//console.log('pause');
						$interval.cancel(timer);
						play = false;
					} else {
						// select next period
						scope.select(scope.periods[index+1]);
					}

				};


				// returns the index of the provided period name in the periods array
				var getIndex = function(periodName) {
					var returnValue = null;
					for(var i=0; i<scope.periods.length; i++) {
						if(scope.periods[i] === periodName) {
							returnValue = i;
						}
					}
					return returnValue;
				};
			


				/*
        element.find('.line').sortable({
					axis: 'x',
					containment: 'parent',
					//containment: '.line',
					//containment: '.timeline',
					cursor: 'move',
					forceHelperSize: true,
					forcePlaceholderSize: true,
					//cursorAt: { left: 5 },
					//grid: [ 20, 10 ],
        });
				*/


        /*
				scope.$watch('selectedIndex', function (value) {
					//element.slider('option', 'max', value);
					//console.log(value);
				});
				*/


      }
      
    };
  });
