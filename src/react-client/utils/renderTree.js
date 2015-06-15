'use strict';

import d3 from 'd3';

export default function(treeData, svgDomNode) {

  const margin = {top: 50, right: 120, bottom: 20, left: 120};
  const width = 725 - margin.right - margin.left;
  const height = 500 - margin.top - margin.bottom;

  let i = 0;

  // Cleans up the SVG on re-render
  d3.select(svgDomNode).selectAll('*').remove();

  let tree = d3.layout.tree()
    .size([height, width]);

  let diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

  let svg = d3.select(svgDomNode)
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  update(treeData);

  function update(data) {

    let nodes = tree.nodes(data).reverse();
    let links = tree.links(nodes);

    nodes.forEach(function(d) {
      d.y = d.depth * 100;
    });

    let node = svg.selectAll('g.node')
      .data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });

    let nodeEnter = node.enter().append('g')
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

    let link = svg.selectAll('path.link')
      .data(links, function(d) {
        return d.target.id;
      });

    link.enter().insert('path', 'g')
      .attr('class', 'link')
      .attr('d', diagonal);

    }
}
