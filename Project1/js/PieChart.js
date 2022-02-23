class PieChart {

    constructor(_config, _data, _keys, _type) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth,
        containerHeight: _config.containerHeight,
        margin: {top: 50, right: 0, bottom: 0, left: 50},
        tooltipPadding: _config.tooltipPadding || 15
  
      }
  
      this.data = _data; 
      
      this.keys = _keys;

      this.type = _type;

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
    }
  
  
    updateVis(countyData, year) {
        let vis = this;
        vis.chart.selectAll('path')
        .data([])
        .exit().remove();
        vis.chart.selectAll('text')
        .data([])
        .exit().remove();

        if (countyData == undefined || countyData.length == 0){
            return
        }
        
        if (vis.keys.length == 6){
            vis.color = d3.scaleOrdinal()
            .domain(vis.keys)
            .range(['#aa5004', '#403f13', '#59448b', '#c51ebc', '#b2a10b', '#3adfd0'])
        }

        if (vis.keys.length == 7){
            vis.color = d3.scaleOrdinal()
            .domain(vis.keys)
            .range(['#3e3c3c', '#50db29', '#8eba00', '#a5a200', '#b68900', '#c56000', '#c82b00'])
        }

        var pie = d3.pie()
            .value(function(d){
                if (vis.keys.find(el => el == d[0])){
                    return d[1];
                }
            })
        
        vis.piechart = vis.chart.selectAll("path").data(pie(Object.entries(countyData)))
        
        var obj = vis.piechart.join("path")
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(50)
            )
            .attr('fill', d => vis.color(d.data[0]))
            .attr("stroke", "white")
            .style("stroke-width", "1px")
            .style("opacity", 1)
            .on('mouseover', function(event,d){
                var key = d.data[0];
                d3.select('#tooltip')
                .style('display', 'block')
                .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
                .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
                .html(`
                    ${key}: ${d.data[1]}
                `);
             })
            .on('mouseleave', () => {
                d3.select('#tooltip').style('display', 'none');
             });
        vis.chart.append("text")
            .attr("x", 200)             
            .attr("y", 0)
            .attr("text-anchor", "middle")  
            .style("font-size", "12px") 
            .text(vis.type + " during " + year.toString());
   }
  
   renderVis() { 
  
    }
  
  
  
  }