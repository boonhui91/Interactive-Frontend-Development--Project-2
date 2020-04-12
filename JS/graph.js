function createGraph(finalData){

    //setting crossfilter on combined data
    let cfData = crossfilter(finalData);
    let yearDimension = cfData.dimension(f => f.year);
  
    // drawing of cases graph
    casesGraph(cfData);
    tempGraph(cfData);
    rainGraph(cfData);
    humidityGraph(cfData);

    // apply_resizing(casesGraph, 20, 100);
    
    dc.renderAll();
}

// When detect less than 768 pixel screen size
function resizing(graphname){
    if(window.matchMedia("(max-width: 767px)").matches){
        // apply responsive resizing to fit mobile screen size
        apply_resizing(graphname, 20, 100);
    } 
}

function casesGraph(cfData){
    let yearDimension = cfData.dimension(f => f.year);
    let caseGroup = yearDimension.group().reduceSum(y => y.Cases)

    let minDate = yearDimension.bottom(1)[0].year;
    let maxDate = yearDimension.top(1)[0].year;

    let casesGraph = new dc.BarChart("#graph");
    casesGraph
        .width(600)
        .height(300)
        .dimension(yearDimension)
        .group(caseGroup)
        .elasticY(true)
        .x(d3.scaleTime().domain([minDate, maxDate]))
        .xUnits(dc.units.ordinal)
        .yAxisLabel("Cases", 40)
        .xAxisLabel("Year")
        .elasticX(true)
        .renderHorizontalGridLines(true)
        .brushOn(false)
        .colors("#ad0a0a");

        resizing(casesGraph);
        
}

function tempGraph(cfData){
    let yearDimension = cfData.dimension(f => f.year);
    let tempGroup = yearDimension.group().reduceSum(y => y.Temperature)

    let minDate = yearDimension.bottom(1)[0].year;
    let maxDate = yearDimension.top(1)[0].year;

    let tempGraph = new dc.BarChart("#graph2");
    tempGraph
        .width(600)
        .height(300)
        .dimension(yearDimension)
        .group(tempGroup)
        .elasticY(true)
        .x(d3.scaleTime().domain([minDate, maxDate]))
        .xUnits(dc.units.ordinal)
        .yAxisLabel("Temperature", 40)
        .xAxisLabel("Year")
        .elasticX(true)
        .renderHorizontalGridLines(true)
        .brushOn(false)
        .colors("#240aa6");

        resizing(tempGraph);
}

function rainGraph(cfData){
    let yearDimension = cfData.dimension(f => f.year);
    let rainGroup = yearDimension.group().reduceSum(y => y.Rainfall)

    let minDate = yearDimension.bottom(1)[0].year;
    let maxDate = yearDimension.top(1)[0].year;

    let rainGraph = new dc.BarChart("#graph3");
    rainGraph
        .width(600)
        .height(300)
        .dimension(yearDimension)
        .group(rainGroup)
        .elasticY(true)
        .x(d3.scaleTime().domain([minDate, maxDate]))
        .xUnits(dc.units.ordinal)
        .yAxisLabel("Rainfall", 40)
        .xAxisLabel("Year")
        .elasticX(true)
        .renderHorizontalGridLines(true)
        .brushOn(false)
        .colors("#29e3d0");

        resizing(rainGraph);
}

function humidityGraph(cfData){
    let yearDimension = cfData.dimension(f => f.year);
    let humidGroup = yearDimension.group().reduceSum(y => y.Humidity)

    let minDate = yearDimension.bottom(1)[0].year;
    let maxDate = yearDimension.top(1)[0].year;

    let humidityGraph = new dc.BarChart("#graph4");
    humidityGraph
    .width(600)
    .height(300)
    .dimension(yearDimension)
    .group(humidGroup)
    .elasticY(true)
    .x(d3.scaleTime().domain([minDate, maxDate]))
    .xUnits(dc.units.ordinal)
    .yAxisLabel("Humidity", 40)
    .xAxisLabel("Year")
    .elasticX(true)
    .renderHorizontalGridLines(true)
    .brushOn(false)
    .colors("#31bd56");

        resizing(humidityGraph);
}