let data, regionList, selectyear, vis1, vis2, vis3, vis4, vis5, vis6;

function leapyear(year)
{
return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

var output = document.getElementById("yearval");
output.innerHTML = 2021

d3.csv('data/merged-data.csv')
  .then(_data => {
  	data = _data;
    regionList = [];

    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
      if (regionList.find(el => el == d.State) == undefined) {
        regionList.push(d.State);
      }
      d.Year = +d.Year;
      d["Days with AQI"] = +d["Days with AQI"];
      d["Good Days"] = +d["Good Days"];
      d["Moderate Days"] = +d["Moderate Days"];
      d["Unhealthy for Sensitive Groups Days"] = +d["Unhealthy for Sensitive Groups Days"];
      d["Unhealthy Days"] = +d["Unhealthy Days"];
      d["Very Unhealthy Days"] = +d["Very Unhealthy Days"];
      d["Hazardous Days"] = +d["Hazardous Days"];
      d["Max AQI"] = +d["Max AQI"];
      d["90th Percentile AQI"] = +d["90th Percentile AQI"];
      d["Median AQI"] = +d["Median AQI"];
      d["Days CO"] = +d["Days CO"]
      d["Days NO2"] = +d["Days NO2"]
      d["Days Ozone"] = +d["Days Ozone"]
      d["Days SO2"] = +d["Days SO2"]
      d["Days PM2.5"] = +d["Days PM2.5"]
      d["Days PM10"] = +d["Days PM10"]

      d.noAQI = 365 - d["Days with AQI"]
      if (leapyear(d.Year)){
        d.noAQI += 1;
      }

		// 		let tokens = d.start.split("-");
  	// 		d.year = +tokens[0];
  	});
    var statebox1 = document.getElementById("state1box");
    var statebox2 = document.getElementById("state2box");

    for(var i = 0; i < regionList.length; i++){
      var reg = regionList[i];
      var opt = document.createElement("option");
      opt.text = reg;
      opt.value = reg;
      statebox1.add(opt);
      statebox2.add(opt.cloneNode(true));
    }
    selectyear = 2021

		vis1 = new LineChart({
			'parentElement': '#Vis1',
			'containerHeight': "200",
			'containerWidth': "410"
		}, data);

    vis2 = new LineChart({
			'parentElement': '#Vis2',
			'containerHeight': "200",
			'containerWidth': "410"
		}, data);

    var keys = ["Days CO", "Days NO2", "Days Ozone", "Days SO2", "Days PM2.5","Days PM10"]
    var safetyKeys = ["noAQI", "Good Days", "Moderate Days", "Unhealthy for Sensitive Groups Days", "Unhealthy Days", "Very Unhealthy Days", "Hazardous Days"]
    vis3 = new BarChart({
      'parentElement': '#Vis3',
      'containerHeight': "200",
      'containerWidth': "410"
    }, data, keys);

    vis4 = new BarChart({
      'parentElement': '#Vis4',
      'containerHeight': "200",
      'containerWidth': "410"
    }, data, keys)

		vis5 = new LineChart({
			'parentElement': '#Vis5',
			'containerHeight': "200",
			'containerWidth': "410"
		}, data, "noAQI");

		vis6 = new LineChart({
			'parentElement': '#Vis6',
			'containerHeight': "200",
			'containerWidth': "410"
		}, data, "noAQI");

		vis7 = new PieChart({
			'parentElement': '#Vis7',
			'containerHeight': "100",
			'containerWidth': "400"
		}, data, keys, "Most common pollutants recorded daily");

		vis8 = new PieChart({
			'parentElement': '#Vis8',
			'containerHeight': "100",
			'containerWidth': "400"
		}, data, keys, "Most common pollutants recorded daily");

    vis9 = new PieChart({
			'parentElement': '#Vis9',
			'containerHeight': "100",
			'containerWidth': "400"
		}, data, safetyKeys, "Daily air safety measures");

    vis10 = new PieChart({
			'parentElement': '#Vis10',
			'containerHeight': "100",
			'containerWidth': "400"
		}, data, safetyKeys, "Daily air safety measures");    
  })
.catch(error => {
    console.error(error);
});

d3.select('#state1').on('change', function() {
  var val = document.getElementById("state1box");
  var countyList = [];

  var countybox = document.getElementById("county1box");

  for(i = countybox.options.length - 1; i >= 0; i--){
      countybox.remove(i);
  }

  tempdata = data.filter(el => el.State == val.value);
  tempdata.forEach(d => {
      if (countyList.find(el => el == d.County) == undefined) {
        countyList.push(d.County);
      }
    });
  
  for(var i = 0; i < countyList.length; i++){
    var reg = countyList[i];
    var opt = document.createElement("option");
    opt.text = reg;
    opt.value = reg;
    countybox.add(opt);
  }

  tempdata = data.filter(el => (el.County == countybox.value) && (el.State == val.value));

  vis1.updateVis(tempdata);
  vis3.updateVis(tempdata);
  vis5.updateVis(tempdata, "noAQI");
  tempdata2 = tempdata.find(el => el.Year == selectyear)
  vis7.updateVis(tempdata2, selectyear);
  vis9.updateVis(tempdata2, selectyear);
});

d3.select('#state2').on('change', function() {
  var val = document.getElementById("state2box");
  var countyList = [];

  var countybox = document.getElementById("county2box");

  for(i = countybox.options.length - 1; i >= 0; i--){
      countybox.remove(i);
  }
  
  tempdata = data.filter(el => el.State == val.value);
  tempdata.forEach(d => {
      if (countyList.find(el => el == d.County) == undefined) {
        countyList.push(d.County);
      }
    });
  
  for(var i = 0; i < countyList.length; i++){
    var reg = countyList[i];
    var opt = document.createElement("option");
    opt.text = reg;
    opt.value = reg;
    countybox.add(opt);
  }

  tempdata = data.filter(el => (el.County == countybox.value) && (el.State == val.value));
  vis2.updateVis(tempdata);
  vis4.updateVis(tempdata);
  vis6.updateVis(tempdata, "noAQI");
  tempdata2 = tempdata.find(el => el.Year == selectyear)
  vis8.updateVis(tempdata2, selectyear)
  vis10.updateVis(tempdata2, selectyear)
});

d3.select('#county1').on('change', function() {
  var val = document.getElementById("county1box");
  var valState = document.getElementById("state1box");

  tempdata = data.filter(el => (el.County == val.value) && (el.State == valState.value));
  vis1.updateVis(tempdata);
  vis3.updateVis(tempdata);
  vis5.updateVis(tempdata, "noAQI");
  tempdata2 = tempdata.filter(el => el.Year == selectyear)
  vis7.updateVis(tempdata2, selectyear);
  vis9.updateVis(tempdata2, selectyear);
});

d3.select('#yearslider').on('change', function(){
  selectyear = +document.getElementById('yearslider').value
  var val = document.getElementById("county1box");
  var valState = document.getElementById("state1box");
  var val2 = document.getElementById("county2box");
  var valState2 = document.getElementById("state2box");

  output.innerHTML = selectyear
  tempdata = data.find(el => (el.County == val.value) && (el.State == valState.value) && (el.Year == selectyear));
  tempdata2 = data.find(el => (el.County == val2.value) && (el.State == valState2.value) && (el.Year == selectyear));

  vis7.updateVis(tempdata, selectyear);
  vis8.updateVis(tempdata2, selectyear);
  vis9.updateVis(tempdata, selectyear);
  vis10.updateVis(tempdata2, selectyear);  
})

d3.select('#disptype').on('change', function(){
  var val = document.getElementById("disptypebox").value;

  var val1 = document.getElementById("county1box");
  var valState1 = document.getElementById("state1box");
  var val2 = document.getElementById("county2box");
  var valState2 = document.getElementById("state2box");

  vis1.initVis(val);
  vis2.initVis(val);

  tempdata = data.filter(function(el){
    return (el.County == val1.value) && (el.State == valState1.value)}
  );

  tempdata2 = data.filter(function(el){
    return (el.County == val2.value) && (el.State == valState2.value)}
  );
  console.log(tempdata)
  console.log(tempdata2)
  vis1.updateVis(tempdata)
  vis2.updateVis(tempdata2)
})

d3.select('#county2').on('change', function() {
  var val = document.getElementById("county2box");
  var valState = document.getElementById("state2box");

  tempdata = data.filter(el => (el.County == val.value) && (el.State == valState.value));
  vis2.updateVis(tempdata);
  vis4.updateVis(tempdata);
  vis6.updateVis(tempdata, "noAQI");
  tempdata2 = tempdata.find(el => el.Year == selectyear)
  vis8.updateVis(tempdata2, selectyear)
  vis10.updateVis(tempdata2, selectyear)
});