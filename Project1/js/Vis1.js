class LineChart {

  constructor(_config, _data, _type = "Median AQI") {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 500,
      containerHeight: _config.containerHeight || 140,
      margin: {top: 170, right: 50, bottom: 170, left: 50},
      tooltipPadding: _config.tooltipPadding || 15

    }

    this.data = _data; 
    this.type = _type;

    this.initVis();
  }
  leapyear(year)
  {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
  }

  initVis(newType = undefined) {
    if (newType != undefined){
      this.type = newType
      this.chart.remove()
    }

      let vis = this; 

  // Initialize axes
      // Width and height as the inner dimensions of the chart area- as before
      vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

      // Define 'svg' as a child-element (g) from the drawing area and include spaces
      // Add <svg> element (drawing space)
     vis.xScale = d3.scaleLinear()
        .domain([1980, 2021])
        .range([0, vis.width]);


      vis.yScale = d3.scaleLinear()
        .domain([d3.min(vis.data, d => d[vis.type]), d3.max( vis.data, d => d[vis.type])]) 
        .range([0, vis.height]);

      vis.xAxis = d3.axisBottom(vis.xScale)
        .ticks(5)
        .tickSizeOuter(0)
        .tickPadding(10);
        //.tickFormat(d => d + ' km');

      vis.yAxis = d3.axisLeft(vis.yScale)
        .ticks(6)
        .tickSizeOuter(0)
        .tickPadding(10);      
        
      vis.svg = d3.select(vis.config.parentElement)
          .attr('width', vis.config.containerWidth)
          .attr('height', vis.config.containerHeight)

      vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left}, ${vis.config.margin.top})`);

      // Initialize linear and ordinal scales (input domain and output range)
 


      // Draw the axis
      vis.xAxisGroup = vis.chart.append('g')
        .attr('class', 'axis x-axis') 
        .call(vis.xAxis);

      vis.yAxisGroup = vis.chart.append('g')
        .attr('class', 'axis y-axis')
        .call(vis.yAxis);
  }


 updateVis(countyData, dispType = "test") {
  let vis = this;
  
    vis.chart.selectAll('path')
    .data([])
    .exit().remove();

    vis.xValue = d => d.Year;
    vis.yValue = d => d[vis.type];
    // Initialize area generator

    vis.line = d3.line()
        .x(d => vis.xScale(vis.xValue(d)))
        .y(d => vis.yScale(vis.yValue(d)));

    // Add line path
    vis.chart.append('path')
        .data([countyData])
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", "2")
        .attr('d', vis.line);
    // Update the axes

    vis.circles = vis.chart.selectAll('circle')
    .data(countyData)
    .join('circle')
   .attr('fill', 'purple')
    .attr('opacity', .8)
    .attr('stroke', "gray")
    .attr('stroke-width', 2)
    .attr('r', 2) 
    .attr('cy', (d) => vis.yScale(d[vis.type]) ) 
    .attr('cx',(d) =>  vis.xScale(d.Year) );;
  vis.circles
    .on('mouseover', (event,d) => {

    d3.select('#tooltip')
      .style('display', 'block')
      .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
      .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
      .html(`
        ${vis.type}: ${d[vis.type]} (${d.Year})
      `);
  })
  .on('mouseleave', () => {
    d3.select('#tooltip').style('display', 'none');
  });

    vis.xAxisGroup.call(vis.xAxis);
    vis.yAxisGroup.call(vis.yAxis);

    vis.chart.append("text")
      .attr("x", (vis.width / 2))             
      .attr("y", -150)
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .text(vis.type + " from 1980-2021");
 }

 renderVis() { 

  }



}