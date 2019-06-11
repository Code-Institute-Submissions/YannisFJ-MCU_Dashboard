queue()
    .defer(d3.json, "data/movie_data.json")
    .await(makeGraphs);

function makeGraphs(error, movieData) {
    
}