'use strict';

angular.module('urbanizationVisualizationApp')
  .directive('map', function (d3) {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      link: function (scope, element, attrs) {
        element.text('this is the map directive');
      }
    };
  });
