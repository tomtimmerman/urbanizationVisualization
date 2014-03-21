'use strict';

angular.module('urbanizationVisualizationApp')
  .directive('map', function (d3) {
    return {
      template: '<div id="map"></div>',
      //replace: true,
      restrict: 'E',
      scope: {
        dataset: '=dataset',
        display: '=display' // property of the data that needs to be projected on the map
      },
      replace: true,
      link: function (scope, element) {
        //element.text('this is the map directive');


        /*
        draw map
          selected country > stroke color
        zoom functie?????? >> hoe poitioneren van tooltip?
        */



        // declare map variables
        var projection, svg, path, countries, loading, details, legend; 

        // init map dimentions
        var margin = {top: 10, left: 10, bottom: 10, right: 10},
            width = parseInt(d3.select('#map').style('width')),
            width = width - margin.left - margin.right,
            mapRatio = .45,
            height = width * mapRatio;




        //
        scope.init = function() {
          var error = [];

          // check if dataset is provided
          if(typeof scope.dataset === 'undefined') {
            error.push({'error': 100, 'message': 'This directive should have a dataset attribute!'});
          }

          // check if display is provided
          if(error.length === 0 && typeof scope.display === 'undefined') {
            error.push({'error': 200, 'message': 'This directive should have a display attribute!'});
          }

          // if there are any errors display them
          if(error.length > 0) {
            for (var i = error.length - 1; i >= 0; i--) {
              element.append('<span class="error">'+error[i].message+'</span>');
            }
          }
        };
        

        // returns the dimensions of the dataset
         function getDimensions() {
          var min = null,
              max = null;

          for (var i = scope.dataset.length - 1; i >= 0; i--) {
            if(scope.dataset[i][scope.display] !== null) {
              if(scope.dataset[i][scope.display] < min || min === null) min = scope.dataset[i][scope.display];
              if(scope.dataset[i][scope.display] > max || max === null) max = scope.dataset[i][scope.display];
            }
          }
          return {'min': min, 'max': max};
        };


        // returns the display value of the country
        function getValue(id, type) { // id is country id
          var returnValue = null;
          for (var i = scope.dataset.length - 1; i >= 0; i--) {
            if(scope.dataset[i].cid === id) {
              returnValue = scope.dataset[i][type];
            }
          }
          return returnValue;
        };


        // returns the name of the country
        function getName(id) { // id is country id
          var returnValue = null;
          for (var i = scope.dataset.length - 1; i >= 0; i--) {
            if(scope.dataset[i].cid === id) {
              returnValue = scope.dataset[i].country;
            }
          }
          return returnValue;
        };


        // return the category of the provided value
        function getScaleCategory(value) {
          var returnValue = 0;
          /*
          var numberOfCategories = 5;
          var roundTo = 5; // round to multiplicity of this number
          var min = scope.getDimensions().min; // get minimum value
          var max = scope.getDimensions().max; // get maximum value

          console.log('min: '+min+' max: '+max);

          min = Math.floor(min/roundTo)*roundTo; // rounded minimum
          max = Math.ceil(max/roundTo)*roundTo; // rounded maximum
          var categoryRange = (max-min)/numberOfCategories; // the width of the range

          if(value !== null) { // check if value isn't null
            returnValue = Math.ceil(value/categoryRange); // calculate the category of the value
          }

          console.log('range: '+categoryRange+' min: '+min+' max: '+max);
          //console.log(returnValue+' : '+value);
          */

          //console.log(scope.getDimensions());

          var scale = d3.scale.linear()
            .domain([getDimensions().min,getDimensions().max])
            .range([1, 6]);

          returnValue = Math.round(scale(value));
          return returnValue;
        };


        // resize the svg map
        function resize() {
            // adjust things when the window size changes
            width = parseInt(d3.select('#map').style('width'));
            width = width - margin.left - margin.right;
            height = width * mapRatio;

            // update projection
            projection
                .translate([width / 2, height / 2])
                .scale(width/6.2);

            // resize the map container
            svg
                .style('width', width + 'px')
                .style('height', height + 'px');

            // resize the map
            svg.selectAll('path').attr('d', path);
        }


        //
        function initMap() {
          projection = d3.geo.equirectangular()
            .center([6,17])
            //.rotate([0,0])
            .scale(width/6.2)
            .translate([width / 2, height / 2]);

          svg = d3.select('#map').append('svg')
            .attr('width', width)
            .attr('height', height);

          path = d3.geo.path()
            .projection(projection);

          // add groups
          countries = svg.append('g'); // group that contains all country paths
          details = svg.append('g'); // group that contains the country details
          legend = svg.append('g'); // group that contains the legend
          loading = svg.append('g'); // group that contains the loading screen
        };


        //
        function drawMap() {  
          // show loading screen
          loading.attr('style','display: inherit;');

          // remove all countries that are already drawn
          countries.selectAll('path').remove();

          // draw map
          d3.json('datasets/world-110m.json', function(error, topology) {
            countries.selectAll('path')
              //.data(topojson.object(topology, topology.objects.countries).geometries)
              .data(topojson.feature(topology, topology.objects.countries).features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('id', function(d) {
                  return 'country'+d.id;
                })
                .attr('class', function(d) {
                  return 'category'+getScaleCategory(getValue(d.id,scope.display));
                })
                .on("mouseover", function(d){
                  drawDetails(d);
                })
                .on("mouseout", function(d){
                  details.selectAll('g').remove();
                });
          });

          // hide loading screen
          loading.attr('style','display: none;');
        };


        //
        function drawDetails(d) {
          var c = d3.select('#country'+d.id);
          var center = path.centroid(d); // get the center of the path
          var x = center[0];
          var y = center[1];
          var width = 200;
          var height = 120;
          var line = 1; // line number
          var fontSize = 12;
          var fontColor = '#000000';
          var lineHeight = fontSize+5;
          //console.log(c.getBBox());

          var countryDetails = details.append('g');

          countryDetails.append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'details');

          // country name
          countryDetails.append('text')
            .attr('dx', x+5)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'fill: '+fontColor+'; stroke: none; font-size: '+fontSize+'px;')
            .attr('text-anchor', 'start')
            .text(getName(d.id));

          // total population
          line++;
          countryDetails.append('text')
            .attr('dx', x+5)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'fill: '+fontColor+'; stroke: none; font-size: '+fontSize+'px;')
            .attr('text-anchor', 'start')
            .text('Total population: ' + getValue(d.id,'pop') + '');

          // urban population
          line++;
          countryDetails.append('text')
            .attr('dx', x+5)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'fill: '+fontColor+'; stroke: none; font-size: '+fontSize+'px;')
            .attr('text-anchor', 'start')
            .text('Urban population: ' + getValue(d.id,'uPop') + ' (' + getValue(d.id,'urbanization') + '%)');

          // urbanization population growth
          line++;
          countryDetails.append('text')
            .attr('dx', x+5)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'fill: '+fontColor+'; stroke: none; font-size: '+fontSize+'px;')
            .attr('text-anchor', 'start')
            .text('Change in urbanization rate: ' + getValue(d.id,'uGrowth') + '%');

          // urban population increase
          line++;
          countryDetails.append('text')
            .attr('dx', x+5)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'fill: '+fontColor+'; stroke: none; font-size: '+fontSize+'px;')
            .attr('text-anchor', 'start')
            .text('Urban pop. increase: ' + getValue(d.id,'uPopIncrease') + '');

        };


        //
        function drawLegend() {

        };


        //
        function drawLoading() {
          // draw background rectangle
          var rectangle = loading.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'loading-background');

          // draw loading text
          var text = loading.append('text')
            .attr('dx', width/2)
            .attr('dy', height/2)
            .attr('text-anchor', 'middle')
            .text('loading...');
        };





        scope.init();

        initMap();

        drawLoading();



        
        /*
        EVENTS
        */
        d3.select(window).on('resize', resize); //  on resize window event, resize the svg map

        scope.$watch('dataset', function (value) {
          //console.log(value);
          if(value.length > 0) { // check if there is any data
            drawMap();
          }
        });

        scope.$watch('display', function (value) {
          //console.log(value);
          if(value.length > 0 && scope.dataset.length > 0) { 
            drawMap();
          }
        });



      }
    };
  });
