createsvg();

function createsvg () {
  var svg = d3.select("#example").append("svg")
    .attr({
      width: 640,
      height: 480
    });

  var roundCorner = 10;
  var rect1 = [50, 50, 100, 50];
  var rect2 = [200, 250, 100, 50];
  var rect3 = [300, 150, 100, 50];
  var rects = [rect1, rect2, rect3];

  var clines = [
    [],
    [[100, 100], [100, 275], [200, 275]],
    [[300, 275], [350, 275], [350, 200]],
    [[350, 150], [350, 75], [150, 75]]
  ];

  var marker = svg.append("defs").append("marker")
    .attr({
      'id': "arrowhead",
      'refX': 10,
      'refY': 5,
      'markerWidth': 10,
      'markerHeight': 10,
      'orient': "auto"
    });
  marker.append("path")
    .attr({
      d: "M 0,0 V 10 L10,5 Z",
      fill: "black"
    });

  var g = svg.selectAll('g')
    .data(rects).enter().append('g')
    .attr({
      transform: function(d) {
        return "translate(" + d[0] + "," + d[1] + ")";
      },
    });

  g.append('rect')
    .attr({
      'width': function(d) { return d[2]; },
      'height': function(d) { return d[3]; },
      'rx': roundCorner,
      'ry': roundCorner,
      'fill': 'none',
      'stroke': 'black'
    });

  g.append('text')
    .attr({
      'text-anchor': "middle",
      'dy': ".35em",
      'fill': 'black',
      transform: function(d) {
        return "translate(" + d[2]/2 + "," + d[3]/2 + ")";
      },
    })
    .text(function(d,i) { return i+1; });

  var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {return d[0];})
    .y(function(d) {return d[1];});

  svg.selectAll('path')
    .data(clines).enter().append('path')
    .attr({
      'd': function(d) {return line(d);},
      'stroke': 'black',
      'stroke-width': 1,
      'fill': 'none',
      'marker-end':"url(#arrowhead)",
    });
};
