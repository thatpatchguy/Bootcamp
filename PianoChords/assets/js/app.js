var svgWidth = 1050;
var svgHeight = 500;

//Making margin
var margin = {
    top: 20,
    right: 20,
    bottom: 80,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#piano")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var pianoGroup = svg.append("g");

d3.csv("/assets/data/chords.csv").then(function(data, err) {
    if (err) throw err;

    var selection = "C#m"

    var keys = [];

    data.forEach(function(data){
        if (data.chord_name == selection){
            keys.push(data.key1);
            keys.push(data.key2);
            keys.push(data.key3);
            if (data.key4){
                keys.push(data.key4);
            }
        }
    })

    locationArray = [];

    d3.csv("assets/data/locations.csv").then(function(ldata,err) {
        ldata.forEach(function(ldata){
            if (ldata.note == keys[0] || ldata.note == keys[1] ||ldata.note == keys[2] ||ldata.note == keys[3]) {
                var coor = {x: ldata.x, y: ldata.y};
                locationArray.push(coor);
            }
        })

        console.log(locationArray);
        var circlesGroup = pianoGroup.selectAll("circle")
            .data(locationArray)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 20)
            .attr("color", "black")
            .attr("fill", "blue")
    })
    
})
