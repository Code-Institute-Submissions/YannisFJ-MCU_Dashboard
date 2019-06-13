queue()
    .defer(d3.json, "../../data/movie_data.json")
    .await(makeGraphs);

function makeGraphs(error, movieData) {
    
    var ndx = crossfilter(movieData);
    
    /*date formatting*/
    var parseDate = d3.time.format("%d/%m/%Y").parse;
    movieData.forEach(function (d){
        d.date = parseDate(d.date);
    });
    
    /*date data*/
    var date_dim = ndx.dimension(dc.pluck('date'));
    
    var min_date = date_dim.bottom(1)[0].date;
    var max_date = date_dim.top(1)[0].date;
    
    /*Marvel franchise data*/
    var franchise_dim = ndx.dimension(dc.pluck('franchise'));
    
    var total_gross_per_franchise = franchise_dim.group().reduceSum(dc.pluck("gross"));
    var cinemas_per_franchise = franchise_dim.group().reduceSum(dc.pluck("cinemas"));
    var budget_per_franchise = franchise_dim.group().reduceSum(dc.pluck("budget"));

    /* Marvel Individual Movie data*/
    var title_dim = ndx.dimension(dc.pluck('title'));
    
    var gross_per_title = title_dim.group().reduceSum(dc.pluck("gross"));
    var budget_per_title = title_dim.group().reduceSum(dc.pluck("budget"));
    var weekend_gross_title = title_dim.group().reduceSum(dc.pluck('opening'));
    
    /* opening weekend gross data */
    var weekend_gross = date_dim.group().reduceSum(dc.pluck('opening'));
    
    /* for budget related scatter graph */
    var budget_dim = ndx.dimension(function (d) {
        return [d.date, d.budget, d.title, d.franchise];
    });
    var budget_group = budget_dim.group();
    
    /*colors*/
    var scatterColors = d3.scale.ordinal()
                .domain(["Iron Man", "Captain America", "Thor", "Ant-Man", "Avengers", "Guardians of the Galaxy"])
                .range(["Tomato", "Orange", "Violet", "green", "SlateBlue", "purple"]);
    
    /*for scatter graph 2 data*/
    var gross_progress_dim = ndx.dimension(function (d) {
        return [d.date, d.gross];
    });
    var gross_progress_group = gross_progress_dim.group();

    /*budget stacked graph data*/
    var movieBudget = title_dim.group().reduceSum(function (d) {
          if (d.title === "Avengers IV: Endgame") {
                 return +d.budget;
             } else if (d.title === "Avengers I") {
                 return +d.budget;
             } else if (d.title === "Avengers III: Infinity War") {
                 return +d.budget;
             } else if (d.title === "Iron Man") {
                 return +d.budget;
             } else if (d.title === "Iron Man II") {
                 return +d.budget;
             } else if (d.title === "Iron Man III") {
                 return +d.budget;
             } else if (d.title === "Guardians of The Galaxy 2") {
                 return +d.budget;
             } else if (d.title === "Guardians of The Galaxy") {
                 return +d.budget;
             } else if (d.title === "Thor") {
                 return +d.budget;
             } else if (d.title === "Thor II: The Dark World") {
                 return +d.budget;
             } else if (d.title === "Thor III: Ragnarock") {
                 return +d.budget;
             } else if (d.title === "Captain America I: The First Avenger") {
                 return +d.budget;
             } else if (d.title === "Captain America II: The Winter Soldier") {
                 return +d.budget;
             } else if (d.title === "Captain America III: Civil War") {
                 return +d.budget;
             } else if (d.title === "Ant Man") {
                 return +d.budget;
             } else if (d.title === "Ant Man II") {
                 return +d.budget;
             } else if (d.title === "Avengers II: Age of Ultron") {
                 return +d.budget;
             } else {
                 return 0;
             }
         });

    /**BUTTONS**/
    /*select menu 1*/
    var dim = ndx.dimension(dc.pluck('franchise'));
    var group = dim.group();
        
    dc.selectMenu("#franchise-selector")
        .dimension(dim)
        .group(group);
        
    /* select menu 2 */
    var dim2 = ndx.dimension(dc.pluck('title'));
    var group2 = dim2.group();
        
    dc.selectMenu("#title-selector")
        .dimension(dim2)
        .group(group2);
        
    /*select menu 3*/
    var dim3 = ndx.dimension(dc.pluck('franchise'));
    var group3 = dim3.group();
        
    dc.selectMenu("#title-selector-2")
        .dimension(dim3)
        .multiple(true)
        .group(group3);
    
    /* select menu 4 */
    var dim4 = ndx.dimension(dc.pluck('date'));
    var group4 = dim4.group();
        
    dc.selectMenu("#release-date-selector")
        .dimension(dim4)
        .group(group4);

    /**CHARTS**/
    
    var stackedChart = dc.barChart("#stacked-chart");
        stackedChart
            .width(1200)
            .height(500)
            .margins({top: 50, right: 50, bottom: 150, left: 80})
            .dimension(title_dim)
            .group(movieBudget, "Movie Budget")
            .title(function (d) {
                    return "$" + d.value;
                })
            .stack(weekend_gross_title, "Movie Opening Weekend Gross")
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxisLabel("Opening Weekend Gross ($)")
            .legend(dc.legend().x(130).y(0).itemHeight(15).gap(5));
    
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
            
            dc.barChart("#cinemas_per_franchise")
            .width(800)
            .height(400)
            .margins({top: 10, right: 50, bottom: 50, left: 60})
            .dimension(franchise_dim)
            .group(cinemas_per_franchise)
            .transitionDuration(500)
            .title(function (d) {
                return d.key + " was shown in " + d.value + " cinemas";
            })
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("MCU Franchises (2+ movies)")
            .yAxisLabel("Number of Cinemas")
            .yAxis().ticks(4);
        
        dc.pieChart("#gross_title")
            .height(300)
            .radius(1500)
            .dimension(title_dim)
            .group(gross_per_title)
            .title(function (d) {
                return d.key + ", had a worldwide gross of $" + d.value;
            })
            .transitionDuration(1500);
        
        dc.pieChart("#budgetpertitle")
            .height(300)
            .radius(1500)
            .dimension(title_dim)
            .title(function (d) {
                return d.key + ", had a budget of $" + d.value;
            })
            .group(budget_per_title)
            .transitionDuration(1500);
        
        var budget_chart = dc.scatterPlot("#scatter");
        budget_chart 
            .width(700)
            .height(400)
            .x(d3.time.scale().domain([min_date, max_date]))
            .brushOn(false)
            .symbolSize(8)
            .clipPadding(10)
            .xAxisLabel("Release Date of MCU Movies")
            .yAxisLabel("Budget Spent (USD $)")
            .title(function (d) {
                return d.key[2] + ", had a budget of $" + d.key[1];
            })
            .colorAccessor(function(d) {
                return d.key[3];
            })
            .colors(scatterColors)
            .dimension(budget_dim)
            .group(budget_group)
            .margins({top: 10, right: 50, bottom: 75, left: 105});
            
        dc.lineChart("#weekend")
            .width(1100)
            .height(400)
            .margins({top: 10, right: 50, bottom: 40, left: 110})
            .dimension(date_dim)
            .group(weekend_gross)
            .transitionDuration(500)
            .x(d3.time.scale().domain([min_date, max_date]))
            .xAxisLabel("MCU Movie Release Dates")
            .yAxisLabel("Opening Weekend Gross (USD $)")
            .yAxis().ticks(7);
            
            /*composite graph**/
            var ironManFranchiseGross = date_dim.group().reduceSum(function (d){
                if (d.franchise === "Iron Man") {
                    return +d.gross;
                } else {
                    return 0;
                }
            });
            
            var captainAmericaFranchiseGross = date_dim.group().reduceSum(function (d){
                if (d.franchise === "Captain America") {
                    return +d.gross;
                } else {
                    return 0;
                }
            });
            
            var avengersFranchiseGross = date_dim.group().reduceSum(function (d){
                if (d.franchise === "Avengers") {
                    return +d.gross;
                } else {
                    return 0;
                }
            });
            
            var thorFranchiseGross = date_dim.group().reduceSum(function (d){
                if (d.franchise === "Thor") {
                    return +d.gross;
                } else {
                    return 0;
                }
            });
            
            var antManFranchiseGross = date_dim.group().reduceSum(function (d){
                if (d.franchise === "Ant-Man") {
                    return +d.gross;
                } else {
                    return 0;
                }
            });
            
            var guardiansFranchiseGross = date_dim.group().reduceSum(function (d){
                if (d.franchise === "Guardians of the Galaxy") {
                    return +d.gross;
                } else {
                    return 0;
                }
            });
            
            var compositeChart = dc.compositeChart('#gross_composite_chart');
            compositeChart
                .width(650)
                .height(300)
                .dimension(date_dim)
                .margins({top: 10, right: 50, bottom: 40, left: 110})
                .x(d3.time.scale().domain([min_date, max_date]))
                .yAxisLabel("Worldwide Gross (USD $)")
                .title(function (d) {
                return "Movie had a worldwide gross of $" + d.value;})
                .legend(dc.legend().x(130).y(20).itemHeight(13).gap(5))
                .renderHorizontalGridLines(true)
                .compose([
                    dc.lineChart(compositeChart)
                        .colors('red')
                        .group(ironManFranchiseGross, "Iron Man"),
                    dc.lineChart(compositeChart)
                        .colors('blue')
                        .group(captainAmericaFranchiseGross, "Captain America"),
                    dc.lineChart(compositeChart)
                        .colors('green')
                        .group(avengersFranchiseGross, "Avengers"),
                    dc.lineChart(compositeChart)
                        .colors('orange')
                        .group(thorFranchiseGross, "Thor"),
                    dc.lineChart(compositeChart)
                        .colors('black')
                        .group(antManFranchiseGross, "Ant-Man"),
                    dc.lineChart(compositeChart)
                        .colors('purple')
                        .group(guardiansFranchiseGross, "Guardians of the Galaxy")
                    ])
                    .brushOn(false);
   
            

    dc.renderAll();
}


