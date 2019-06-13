queue()
    .defer(d3.json, "../../data/movie_data.json")
    .await(makeGraphs);

function makeGraphs(error, movieData) {
    
    var ndx = crossfilter(movieData);
    
    /*Marvel franchise data*/
    var franchise_dim = ndx.dimension(dc.pluck('franchise'));
    
    var total_gross_per_franchise = franchise_dim.group().reduceSum(dc.pluck("gross"));
    
    /*date formatting*/
    var parseDate = d3.time.format("%d/%m/%Y").parse;
    franchiseData.forEach(function (d){
        d.date = parseDate(d.date);
    });
    
    /*dates*/
    var date_dim = ndx.dimension(dc.pluck('date'));
    
    var min_date = date_dim.bottom(1)[0].date;
    var max_date = date_dim.top(1)[0].date;


    
    dc.barChart("#gross_movie")
            .width(750)
            .height(300)
            .margins({top: 50, right: 50, bottom: 50, left: 100})
            .dimension(franchise_dim)
            .group(total_gross_per_franchise)
            .transitionDuration(500)
            .title(function (d) {
                return "The " + d.key + " franchise had a worldwide gross of $" + d.value;
            })
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("MCU Franchises (2+ movies)")
            .yAxisLabel("Worldwide gross ($)")
            .yAxis().ticks(7);
            
            dc.renderAll();
}


