
(function() {
  let width = window.innerWidth,
  height = 400

  let svg = d3.select('#skills')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .attr('class', 'svgcontainer')
    .attr('transform', 'translate(-150,0)')

    let color = d3.scaleOrdinal(['#AA7047', '#BBB46A', '#A6B170', '#C6BF66', '#7DA182' ])

  d3.queue()
    .defer(d3.json, 'graph.json')
    .await(ready)

  var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function(d) { return d.skill; }).strength(0.025))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    // .force('y', d3.forceY(height / 2).strength(0.015))
    // .force('x', d3.forceX(width / 1.5).strength(0.05))

  // let simulation = d3.forceSimulation()
  //   .force('link', d3.forceLink().id(function(d) {return d.skill}))
  //   .force('x', d3.forceX(width / 1.5).strength(0.05))
  //   .force('y', d3.forceY(height / 2).strength(0.05))
  //   .force('collide', d3.forceCollide((d) => circleScale(d.level) + 50))

  function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }

  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }

  function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }

  let circleScale = d3.scaleSqrt()
                    .domain([3, 15])
                    .range([20, 100])

  function ready (error, datapoints){

      let link = svg.selectAll('.link')
      .data(datapoints.links)
      .enter()
      .append('line')
      .attr('class', 'links')


      let circles = svg.selectAll('.skill')
        .data(datapoints.nodes)
        .enter()
        .append('circle')
        .attr('class', 'skill')
        .attr('r', (d) => circleScale(d.level))
        .attr('fill', (d) => color(d.type))
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )

      let text = svg.selectAll(null)
          .data(datapoints.nodes)
          .enter()
          .append('text')
          .attr('text-anchor', 'middle')
          .text((d) => d.skill)

      // circles.append('text')
      //   .attr('text-anchor', 'middle')
      //   .text((d) => d.skill)

      simulation.nodes(datapoints.nodes)
        .on('tick', ticked)

      simulation.force('link')
        .links(datapoints.links);

      function ticked(){
        let r = 50
        circles
          .attr('cx', (d) => d.x = Math.max(r, Math.min(width - r, d.x)))
          .attr('cy', (d) => d.y = Math.max(r, Math.min(height - r, d.y)))

        text
          .attr('x', (d) => d.x)
          .attr('y', (d) => d.y)

        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y)

      }
  }

})()
