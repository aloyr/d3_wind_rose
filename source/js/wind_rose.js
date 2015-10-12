(function($){

  var data = [1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8,1,2,4,8];

  var size = 500,
      cx = size/2,
      cy = size/2,

      svg = d3.select('body').append('svg')
        .attr({width: size, height: size})

      group = svg.append('g')
        .attr('transform', 'translate(' + [ cx, cy ] + ')')
        .attr('id', 'stack-data'),

      r = size * .4,
      p = Math.PI * 2,
      gap = 0,
      w = p/36,
      inner = r/4,

      arc = d3.svg.arc()
        .innerRadius(inner)
        .outerRadius(function(d, i) {return inner + (r - inner) * d /8;})
        .startAngle(function(d, i) {return i * w + gap;})
        .endAngle(function(d, i) {return i * w + w - gap;}),

      arc2 = d3.svg.arc()
        .innerRadius(inner)
        .outerRadius(inner + 1)
        .startAngle(function(d, i) {return i * w + gap;})
        .endAngle(function(d, i) {return i * w + w - gap;}),

      getRange = function(d) {
        result = [];
        for (i = 0; i < 360; i += d) {
          result.push(i);
        }
        return result;
      },

      labels = [2, 4, 6, 8],

      axis = svg.append('g')
        .attr('transform', 'translate(' + [ cx, cy ] + ')')
        .attr('id', 'stack-axis'),

      outer_labels = svg.append('g')
        .attr('transform', 'translate(' + [ cx, cy ] + ')')
        .attr('id', 'outer-label');

  var effect = group.selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', arc2)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.4)
    .attr('opacity', 0.7)
    .attr('fill', d3.scale.category20b());

  effect.transition()
    .duration(200)
    .delay(function(d, i) {return 500 + i * 10;})
    .ease('elastic')
    .attr('d', arc);

  var axis_enter = axis.selectAll('path')
    .data(labels)
    .enter();

  axis_enter.append('circle')
    .attr({
      'cx': 0,
      'cy': 0,
      'r': function(d) {return inner + (r - inner) * d / 8;},
      'fill': 'none',
      'stroke': function(d, i) { return (i % 2) == 0 ? '#bbbbbb' : '#555555';},
      'stroke-width': function(d, i) { return (i % 2) == 0 ? 0.4 : 0.4; },
      'opacity': 0.5
    });

  axis_enter.append('text')
    .text(function(d, i) {return d + 'x';})
    .attr('fill', 'black')
    .attr('opacity', 0.4)
    // .attr('text-anchor', 'middle')
    .attr('x', 3)
    .attr('y', function(d, i) {return (inner + ( r - inner) * d / 8 - 10) * -1;})
    .attr('font-size', '10px');

  var outer_labels_enter = outer_labels.selectAll('path')
    .data(getRange(10))
    .enter();

  outer_labels_enter.append('text')
    .text(function(d, i) { return d; })
    // .attr('y', function(d, i) {return ((r+10) * Math.cos(Math.PI * d / 180) * -1) + 5;})
    // .attr('x', function(d, i) {return (r+10) * Math.sin(Math.PI * d / 180);})
    .attr('y', (r + 2) * -1)
    .attr('transform', function(d, i) {return 'rotate(' + d + ' 0,0' + ')';})
    .attr('text-anchor', 'middle')
    .attr('alignment-baseling', 'middle')
    .attr('font-size', '10px')
    .attr('font-weight', function(d, i) {return (d % 30) == 0 ? 'bold' : 'normal';})
    .attr('opacity', function(d, i) {return (d % 30) == 0 ? 0.45 : 0.3;});

}(jQuery));