'use strict';

angular.module('urbanizationVisualizationApp')
  .directive('timeline', function ($interval) {
    return {
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
        var timer,
						play = false;

        scope.years = []; // year labels
        scope.periods = []; // period names


        // populate years and periods arrays
        for (var i = 0; i < ((scope.endDate-scope.startDate)/scope.periodLength)+1; i++) {
					scope.years.push(scope.startDate+(scope.periodLength*i)); // generate array with year labels
					var periodName = scope.startDate+(scope.periodLength*i)+'-'+(scope.startDate+(scope.periodLength*(i+1))); // set period name
					if(i < ((scope.endDate-scope.startDate)/scope.periodLength)) {scope.periods.push(periodName);} // generate array with period names
        }


				// 
				scope.select = function(value) {
					scope.selectedPeriod = value;
				};


				//
				scope.play = function() {
					if(play === false && getIndex(scope.selectedPeriod)+1 < scope.periods.length) {
						element.find('button').find('span').attr('class', 'glyphicon glyphicon-pause');
						play = true;
						timer = $interval(setNextPeriod, 500);
					} else {
						element.find('button').find('span').attr('class', 'glyphicon glyphicon-play');
						play = false;
						$interval.cancel(timer);
					}
				};

				
				// set the next period
				var setNextPeriod = function() {
					var index = getIndex(scope.selectedPeriod);
					if((index+2) >= scope.periods.length) { // check if next index is the last period in array
						// last period in array
						$interval.cancel(timer);
						scope.select(scope.periods[index+1]);
						element.find('button').find('span').attr('class', 'glyphicon glyphicon-play');
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

      }
      
    };
  });
