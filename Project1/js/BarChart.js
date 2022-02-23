class BarChart {

    constructor(_config, _data, _keys) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 500,
        containerHeight: _config.containerHeight || 140,
        margin: {top: 170, right: 50, bottom: 170, left: 50},
        tooltipPadding: _config.tooltipPadding || 15
  
      }
  
      this.data = _data; 
      
      this.keys = _keys;

      this.initVis();
    }

    initVis() {
    
        let vis = this; 
    
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)
  
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left}, ${vis.config.margin.top})`);
  
        var groups = d3.range(1980, 2022)
        vis.xScale = d3.scaleLinear()
          .domain([1980,2021])
          .range([0, vis.width]);
  
  
        vis.yScale = d3.scaleLinear()
          .domain([0,400]) 
          .range([0, vis.height]);

        vis.xAxis = d3.axisBottom(vis.xScale)
          .ticks(5)
          .tickSizeOuter(0)
          .tickPadding(10);

        vis.yAxis = d3.axisLeft(vis.yScale)
          .ticks(6)
          .tickSizeOuter(0)
          .tickPadding(10);

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

        vis.color = d3.scaleOrdinal()
        .domain(vis.keys)
        .range(['#aa5004', '#403f13', '#59448b', '#c51ebc', '#b2a10b', '#3adfd0'])


        // Initialize area generator
            // vis.circles
            //   .on('mouseover', (event,d) => {
            //     console.log("mouse over! ");
            //     console.log(event);
            //     console.log(d);
            
            //   d3.select('#tooltip')
            //     .style('display', 'block')
            //     .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
            //     .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
            //     .html(`
            //       ${d.name} - ${d.start}
            //       <br>Cost: ${d.cost}
            //     `);
            // })
            // .on('mouseleave', () => {
            //   d3.select('#tooltip').style('display', 'none');
            // });

        // Add line path
        var stacked = d3.stack()
            .keys(vis.keys)(countyData)
        
        vis.chart.append('g')
            .selectAll('g')
            .data(stacked)
            .enter()
            .append('g')
                .attr("fill", d => vis.color(d.key))
                .selectAll('rect')
                .data(d => d)
                .enter()
                .append('rect')
                    .attr('x', d => (d.data.Year - 1980) * vis.width/41)
                    .attr('y', d => vis.yScale(d[1]))
                    .attr('height', d => vis.yScale(d[0]) - vis.yScale(d[1]))
                    .attr('width', 10)
                    .on('mouseover', function(event,d){
                      var key = d3.select(this.parentNode).datum().key;
                      d3.select('#tooltip')
                        .style('display', 'block')
                        .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
                        .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
                        .html(`
                          ${key}: ${d[1] - d[0]} (${d.data.Year})
                        `);
                    })
                    .on('mouseleave', () => {
                      d3.select('#tooltip').style('display', 'none');
                    });


        // Update the axes
        vis.xAxisGroup.call(vis.xAxis);
        vis.yAxisGroup.call(vis.yAxis);

        vis.chart.append("text")
          .attr("x", (vis.width / 2))             
          .attr("y", -150)
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .text("Most common pollutants recorded daily from 1980-2021");
   }
  
   renderVis() { 
  
    }
  
  
  
  }