'use strict';

var d3 = require('d3');

var FamilyTree = require('../FamilyTree');
var NancyFamily = require('../NancyFamily');
var NancyFamilyTree = new FamilyTree('Nancy');
var treeData = NancyFamilyTree.build(NancyFamily.tree);

var margin = {top: 50, right: 120, bottom: 20, left: 120};
var width = 960 - margin.right - margin.left;
var height = 500 - margin.top - margin.bottom;

var i = 0;

var tree = d3.layout.tree()
  .size([height, width]);

var diagonal = d3.svg.diagonal()
  .projection(function(d) {
    return [d.x, d.y];
  });

var svg = d3.select('body').append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var nodes = tree.nodes(treeData).reverse();
var links = tree.links(nodes);

nodes.forEach(function(d) {
  d.y = d.depth * 100;
});

var node = svg.selectAll('g.node')
  .data(nodes, function(d) {
    return d.id || (d.id = ++i);
  });

var nodeEnter = node.enter().append('g')
  .attr('class', 'node')
  .attr('transform', function(d) {
    return 'translate(' + d.x + ',' + d.y + ')';
  });

nodeEnter.append('circle')
  .attr('r', 15);

nodeEnter.append('text')
  .attr('y', function(d) {
    return d.children || d.children ? -25 : 25; })
  .attr('dy', '.2em')
  .attr('text-anchor', 'middle')
  .text(function(d) { return d.name; })
  .style('fill-opacity', 1);

var link = svg.selectAll('path.link')
  .data(links, function(d) {
    return d.target.id;
  });

link.enter().insert('path', 'g')
  .attr('class', 'link')
  .attr('d', diagonal);
