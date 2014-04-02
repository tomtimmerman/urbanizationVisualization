'use strict';

angular.module('urbanizationVisualizationApp')
  .directive('map', function (d3) {
    return {
      template: '<div id="map"></div>',
      //replace: true,
      restrict: 'E',
      scope: {
        dataset: '=dataset',
        scale: '=scale', // 
        display: '=display' // property of the data that needs to be projected on the map
      },
      replace: true,
      link: function (scope, element) {
        // declare map variables
        var projection, svg, path, bg, countries, loading, details, legend;

        // init map dimentions
        var margin = {top: 10, left: 10, bottom: 10, right: 10},
            width = parseInt(d3.select('#map').style('width')),
            width = width - margin.left - margin.right,
            mapRatio = .45,
            height = width * mapRatio;


        // initialiation
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
        

        // returns the display value of the country
        function getValue(id, type) { // id is country id
          var returnValue = null;
          for (var i = scope.dataset.length - 1; i >= 0; i--) {
            if(scope.dataset[i].cid === id) {
              returnValue = scope.dataset[i][type];
            }
          }
          return returnValue;
        }


        // returns the name of the country
        function getName(id) { // id is country id
          var returnValue = null;
          for (var i = scope.dataset.length - 1; i >= 0; i--) {
            if(scope.dataset[i].cid === id) {
              returnValue = scope.dataset[i].country;
            }
          }
          return returnValue;
        }


        // return the color for the provided value
        function getColor(value) {
          var returnValue = '#a1a1a1';
          for (var i = scope.scale.length - 1; i >= 0; i--) {
            if(scope.scale[i].max === null && value >= scope.scale[i].min) {returnValue = scope.scale[i].color;}
            if(scope.scale[i].max !== null && scope.scale[i].min !== null && value >= scope.scale[i].min && value < scope.scale[i].max) {returnValue = scope.scale[i].color;}
            if(scope.scale[i].min === null && value < scope.scale[i].max) {returnValue = scope.scale[i].color;}
          }
          return returnValue;
        }


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
          svg.selectAll('path').attr('d', path); // resize paths

          // resize map background
          bg.selectAll('rect')
            .attr('width', width)
            .attr('height', height);

          // resize country details
          if(!countries.select('.selected').empty()) {
            updateDetails(parseInt(countries.select('.selected').attr('id').replace('country',''))); // display details of selected country
          }

          //  resize legend
          drawLegend();
        }


        // init map
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
          bg = svg.append('g'); // group that contains the map background
          countries = svg.append('g'); // group that contains all country paths
          details = svg.append('g') // group that contains the country details
            .attr('class', 'country-details');
          legend = svg.append('g'); // group that contains the legend
          loading = svg.append('g'); // group that contains the loading screen
        }


        // draw the map
        function drawMap() {
          // show loading screen
          loading.attr('style','display: inherit;');

          // remove all countries that are already drawn
          countries.selectAll('path').remove();

          // draw map background
          bg.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'map-background')
            .on('click', function(){
              // remove selection when click on background
              countries.select('.selected')
                .attr('class', function(d) {
                  return '';
                });
              details.attr('style','display: none;'); // hide country details
            });

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
                .attr('style', function(d) {
                  return 'fill: '+getColor(getValue(d.id,scope.display))+';';
                })
                .on('mouseover', function(d){
                  details.attr('style','display: inherit;');
                  updateDetails(d.id);
                })
                .on('mouseout', function(d){
                  // check if a country was selected
                  if(countries.select('.selected').empty()) {
                    details.attr('style','display: none;'); // no country was selected
                  } else {
                    updateDetails(parseInt(countries.select('.selected').attr('id').replace('country',''))); // display details of selected country
                  }
                })
                .on('click', function(d){
                  // remove existing selection
                  countries.select('.selected')
                    .attr('class', function(d) {
                      return '';
                    });

                  // add selected class
                  countries.select('#country'+d.id)
                    .attr('class', 'selected');

                  // update details
                  updateDetails(d.id);
                });
          });

          // hide loading screen
          loading.attr('style','display: none;');
        }


        // update the color of the countries
        function updateMap() {
          // show loading screen
          loading.attr('style','display: inherit;');

          // update countries
          countries.selectAll('path')
            .attr('style', function(d) {
              return 'fill: '+getColor(getValue(d.id,scope.display))+';';
            });

          // hide loading screen
          loading.attr('style','display: none;');
        }


        // draw country details
        function drawDetails() {
          // country name
          details.append('text')
            .attr('id', 'title')
            .attr('class', 'title')
            .attr('text-anchor', 'start')
            .text('null');

          // total population
          details.append('text')
            .attr('id', 'pop')
            .attr('text-anchor', 'start')
            .text('null');

          // urban population
          details.append('text')
            .attr('id', 'uPop')
            .attr('text-anchor', 'start')
            .text('null');

          // urbanization population growth
          details.append('text')
            .attr('id', 'uGrowth')
            .attr('text-anchor', 'start')
            .text('null');

          // urban population increase
          details.append('text')
            .attr('id', 'uPopIncrease')
            .attr('text-anchor', 'start')
            .text('null');

          details.attr('style','display: none;'); // hide the empty details

        }


        //
        function updateDetails(id) {
          var fontSize = width/70;
          var lineHeight = fontSize+5;
          var bottomMargin = fontSize+margin.bottom;
          var heightDetails = lineHeight*5+bottomMargin;
          var x = 0; // x position of the details panel
          var y = height - heightDetails; // y position of the details panel
          var line = 1; // line number

          // update country name
          details.select('#title')
            .attr('dx', x+margin.left)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'font-size: '+fontSize*1.2+'px;')
            .text(getName(id));

          // update total population
          line++;
          details.select('#pop')
            .attr('dx', x+margin.left)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'font-size: '+fontSize+'px;')
            .text('Total population: ' + DotFormatted(getValue(id,'pop')*1000) + '');

          // update urban population
          line++;
          details.select('#uPop')
            .attr('dx', x+margin.left)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'font-size: '+fontSize+'px;')
            .text('Urban population: ' + DotFormatted(getValue(id,'uPop')*1000) + ' (' + getValue(id,'urbanization') + '%)');

          // update urbanization population growth
          line++;
          details.select('#uGrowth')
            .attr('dx', x+margin.left)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'font-size: '+fontSize+'px;')
            .text('Urban growth rate: ' + getValue(id,'uGrowth') + '%');

          // update urban population increase
          line++;
          details.select('#uPopIncrease')
            .attr('dx', x+margin.left)
            .attr('dy', y+(lineHeight*line))
            .attr('style', 'font-size: '+fontSize+'px;')
            .text('Urban pop. increase: ' + DotFormatted(getValue(id,'uPopIncrease')*1000) + '');
        }


        // draw the legend
        function drawLegend() {
          // remove all legend elements that already exist
          legend.selectAll('rect').remove();
          legend.selectAll('text').remove();

          // init
          var legendSegmentWidth = width / 25,
              legendSegmentHeight = height / 80,
              fontSize = width/95;

          // draw legend
          for (var i = 1; i < scope.scale.length+1; i++) {
            // draw lagend segment
            legend.append('rect')
              .attr('x',legendSegmentWidth*(i-1)+((width/2)-(legendSegmentWidth*scope.scale.length/2)))
              .attr('y', height - legendSegmentHeight - fontSize - margin.bottom)
              .attr('width', legendSegmentWidth)
              .attr('height', legendSegmentHeight)
              .attr('style', 'fill:'+scope.scale[i-1].color+';');
              //.attr('class', 'category'+i);

            // draw segment label
            legend.append('text')
              .attr('dx', legendSegmentWidth*(i-1)+((width/2)-(legendSegmentWidth*scope.scale.length/2))  +legendSegmentWidth/2)
              .attr('dy', height - margin.bottom)
              .attr('text-anchor', 'middle')
              .attr('style', 'font-size: '+fontSize+'px;')
              .attr('class', 'legend-label')
              .text(scope.scale[i-1].label);
          }
        }


        // loading screen
        function drawLoading() {
          // draw background rectangle
          loading.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'loading-background');

          // draw loading text
          loading.append('text')
            .attr('dx', width/2)
            .attr('dy', height/2)
            .attr('text-anchor', 'middle')
            .text('loading...');
        }


        // format number: 1203400 to 1.203.400
        function DotFormatted(nStr) {
          nStr += '';
          var x = nStr.split('.');
          var x1 = x[0];
          var x2 = x.length > 1 ? '.' + x[1] : '';
          var rgx = /(\d+)(\d{3})/;
          while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
          }
          return x1 + x2;
        }



        // run functions onload
        scope.init();
        initMap();
        drawLoading();
        drawMap();
        drawDetails();
        // drawLegend();



        /*
        EVENTS
        */
        // resize
        d3.select(window).on('resize', resize); //  on resize window event, resize the svg map

        // change dataset
        scope.$watch('dataset', function (value) {
          if(value.length > 0) { // check if there is any data
            updateMap();

            // update country details
            if(!countries.select('.selected').empty()) { // check if a country is selected
              updateDetails(parseInt(countries.select('.selected').attr('id').replace('country',''))); // update country details
            }
            
          }
        });

        // change display
        scope.$watch('display', function (value) {
          //
          if(value.length > 0 && scope.dataset.length > 0) {
            updateMap();
            drawLegend();
          }
        });

        // change scale
        scope.$watch('scale', function () {
          updateMap();
          drawLegend();
        });

      }
    };
  });
