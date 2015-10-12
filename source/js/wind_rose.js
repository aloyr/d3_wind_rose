(function($){
  
var data = [1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8];

var svg = d3.select('body').append('svg')
          .attr({width: 500, height: 500})
          .append('g')
          .attr('transform', 'translate(250,250)');

var group = svg.append('g')
            .attr('transform', 'translate(250, 250)');

var r = 200;
var p = Math.PI * 2;
var gap = 0.005;
var w = p/36;

d3.scale.category20b();
/*
for (i = 0; i < 36; i++) {

  var arc = d3.svg.arc()
    .innerRadius(20)
    .outerRadius(100 + (i * 2))
    .startAngle(i * w + gap)
    .endAngle(i * w + w - gap);

  group.append('path')
    .attr('d', arc);

}
*/

  var arc = d3.svg.arc()
    .innerRadius(20)
    .outerRadius(function(d, i) {return 20 * 8 / d + 40;})
    .startAngle(function(d, i) {return i * w + gap;})
    .endAngle(function(d, i) {return i * w + w - gap;});

svg.selectAll('path')
  .data(data)
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', d3.scale.category20b());

}(jQuery));