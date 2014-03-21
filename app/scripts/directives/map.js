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



        var projection, svg, path, countries, loading, details, legend; // map vars

        // init map dimentions
        var margin = {top: 10, left: 10, bottom: 10, right: 10},
            width = parseInt(d3.select('#map').style('width')),
            width = width - margin.left - margin.right,
            mapRatio = .45,
            height = width * mapRatio;

        
        

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
        






        scope.$watch('dataset', function (value) {
          console.log(value);

          if(value.length > 0) { // check if there is any data
            //console.log(scope.getDimensions());
            //element.find('svg').remove(); // removes the current map
            scope.drawMap();
          }


        });


        scope.$watch('display', function (value) {
          //console.log(value);


          if(value.length > 0 && scope.dataset.length > 0) { 
            //console.log(scope.getDimensions());
            //element.find('svg').remove(); // removes the current map
            scope.drawMap();
          }

        });






        






        // calculate color scale

        // draw map
          // selected country > stroke color

        // draw legend

        // draw tooltip?
        // zoom functie?????? >> hoe poitioneren van tooltip?








        // returns the dimensions of the dataset
        scope.getDimensions = function() {
          /*
          var values = [];
          for (var i = scope.dataset.length - 1; i >= 0; i--) {
            if(scope.dataset[i][scope.display] !== null) {
              values.push(scope.dataset[i][scope.display]);
            }
          }
          values.sort(); // sort array

          //console.log(values);
          //console.log('min: '+values[0]+' max: '+values[values.length-1]);

          return {'min': values[0], 'max': values[values.length-1]};
          */
          var min = null,
            max = null;

          for (var i = scope.dataset.length - 1; i >= 0; i--) {
            if(scope.dataset[i][scope.display] !== null) {
              if(scope.dataset[i][scope.display] < min || min === null) min = scope.dataset[i][scope.display];
              if(scope.dataset[i][scope.display] > max || max === null) max = scope.dataset[i][scope.display];
            }
          }

          //console.log({'min': min, 'max': max});
          return {'min': min, 'max': max};

        };


        // returns the display value of the country
        scope.getValue = function(id, type) { // id is country id
          var returnValue = null;
          for (var i = scope.dataset.length - 1; i >= 0; i--) {
            if(scope.dataset[i].cid === id) {
              returnValue = scope.dataset[i][type];
            }
          }

          //console.log('getValue: '+returnValue+' : '+scope.display);

          return returnValue;
        };


        // returns the name of the country
        scope.getName = function(id) { // id is country id
          var returnValue = null;
          for (var i = scope.dataset.length - 1; i >= 0; i--) {
            if(scope.dataset[i].cid === id) {
              returnValue = scope.dataset[i].country;
            }
          }
          return returnValue;
        };


        // return the category of the provided value
        scope.getScaleCategory = function(value) {

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
            //.domain([1, 6])
            //.range([scope.getDimensions().min,scope.getDimensions().max]);
            .domain([scope.getDimensions().min,scope.getDimensions().max])
            .range([1, 6]);

          returnValue = Math.round(scale(value));

          //console.log(value+' : '+scope.getDimensions().max);
          //console.log(returnValue);

          return returnValue;
        };


        //
        scope.initMap = function() {
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
        scope.drawMap = function() {  
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
                  return 'category'+scope.getScaleCategory(scope.getValue(d.id,scope.display));
                })
                .on("mouseover", function(d){
                  //return tooltip.style("visibility", "visible");
                  //scope.drawDetails(d.id);
                  scope.drawDetails(d);
                })
                .on("mouseout", function(d){
                  //return tooltip.style("visibility", "visible");
                  //details.selectAll('rect').remove();
                  details.selectAll('g').remove();
                });
          });

          // hide loading screen
          loading.attr('style','display: none;');
        };


        //
        scope.drawDetails = function(d) {
          //console.log(d.id);

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
            .text(scope.getName(d.id));

          // total population
          line++;
          countryDetails.append('text')
            .attr('dx', x+5)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'fill: '+fontColor+'; stroke: none; font-size: '+fontSize+'px;')
            .attr('text-anchor', 'start')
            .text('Total population: ' + scope.getValue(d.id,'pop') + '');

          // urban population
          line++;
          countryDetails.append('text')
            .attr('dx', x+5)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'fill: '+fontColor+'; stroke: none; font-size: '+fontSize+'px;')
            .attr('text-anchor', 'start')
            .text('Urban population: ' + scope.getValue(d.id,'uPop') + ' (' + scope.getValue(d.id,'urbanization') + '%)');

          // urbanization population growth
          line++;
          countryDetails.append('text')
            .attr('dx', x+5)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'fill: '+fontColor+'; stroke: none; font-size: '+fontSize+'px;')
            .attr('text-anchor', 'start')
            .text('Change in urbanization rate: ' + scope.getValue(d.id,'uGrowth') + '%');

          // urban population increase
          line++;
          countryDetails.append('text')
            .attr('dx', x+5)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'fill: '+fontColor+'; stroke: none; font-size: '+fontSize+'px;')
            .attr('text-anchor', 'start')
            .text('Urban pop. increase: ' + scope.getValue(d.id,'uPopIncrease') + '');



        };


        //
        scope.drawLegend = function() {

        };


        //
        scope.drawLoading = function() {
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
        




        scope.init();

        scope.initMap();

        scope.drawLoading();

        d3.select(window).on('resize', resize); //  on resize window event, resize the svg map



      }
    };
  });
