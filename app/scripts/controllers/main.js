'use strict';

angular.module('urbanizationVisualizationApp')
  .controller('MainCtrl', function ($scope) {


    $scope.periods = ['1950-1955','1955-1960','1960-1965','1965-1970','1970-1975','1975-1980','1980-1985','1985-1990','1990-1995','1995-2000','2000-2005','2005-2010','2010-2015','2015-2020','2020-2025','2025-2030','2030-2035','2035-2040','2040-2045','2045-2050'];
    $scope.selectedPeriod = $scope.periods[0];


  });
