// Function used to fill the bubbles with a random color on each mouseout for pizzaz
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',255)';
  };

//Declaring svg size
var svgWidth = 960;
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

//Creating svg
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//creating group within the svg area accounting for margins
var scatterGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Setting default axes
var chosenXAxis = "poverty";
var chosenYAxis = "smokes";

//Creating Scalers
function xScaler(data, chosenXAxis){
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenXAxis]) - 2, d3.max(data, d => d[chosenXAxis])])
        .range([0,width]);
    return xLinearScale;
};

function yScaler(data, chosenYAxis){
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenYAxis]) - 3, d3.max(data, d => d[chosenYAxis])])
        .range([height, 0]);
    return yLinearScale;
};

//Weeeeee 
function renderXAxis(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1500)
        .call(bottomAxis);

    return xAxis;
};

//These change the axes to reflect the new chosen option
function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1500)
        .call(leftAxis);

    return yAxis;
};

//This make circles fly around
function renderCircles(circlesGroup, xScaler, yScaler, chosenXAxis, chosenYAxis) {
    circlesGroup.transition().duration(1500)
        .attr("cx", d => xScaler(d[chosenXAxis]))
        .attr("cy", d => yScaler(d[chosenYAxis]));

    return circlesGroup;
}

//Gotta make sure the state labels move with it! Was weird when it didn't trust me
function renderText(textGroup, xScaler, yScaler, chosenXAxis, chosenYAxis){
    textGroup.transition().duration(1500)
        .attr("x", d => xScaler(d[chosenXAxis]))
        .attr("y", d => yScaler(d[chosenYAxis]));

    return textGroup;
}

//Wow okay now lets check out the data
d3.csv("assets/data/data.csv").then(function(data, err) {
    if (err) throw err;
    //Gotta get that data numerical
    data.forEach(function(data){
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;
        data.income = +data.income;
        data.state = data.state;
    });

    //All this will pretty much make the graph
    var xLinearScale = xScaler(data, chosenXAxis);
    var yLinearScale = yScaler(data, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = scatterGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    var yAxis = scatterGroup.append("g")
        .call(leftAxis);

    var circlesGroup = scatterGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", 18)
        .attr("color", "black")
        .attr("fill", "blue")
        .attr("opacity", .75)
        .attr("stroke", "black");
    //.tip just refused to work so workaround
    var toolTip = d3.select("body")
        .append("div")
        .classed("tooltip", true);    

    //Sets up the text labels for the bubbles
    var textGroup = scatterGroup.selectAll()
        .data(data)
        .enter()
        .append("text")
        .text(d => (d.abbr))
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.smokes) + 4)
        .style("font-size", "11px")
        .style("text-anchor", "middle")
        .style("fill", "white")


    //On mouseover we need to show more data about that state
    circlesGroup.on("mouseover", function(data, i) {
        toolTip.style("display", "block")
            .html(`<strong>${data.state}</strong><br> Smokes: ${data.smokes}% <br> Lacks Healthcare: ${data.healthcare}% <br> Obese: ${data.obesity}%<br>Poverty: ${data.poverty}%<br>Income: $${data.income}`)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px");
        d3.select(this)
            .attr("opacity", "100%");
    }).on("mouseout", function(data) {//Gotta hide it once they lose interest
        toolTip.style("display", "none");
        d3.select(this)
            .attr("opacity", "85%")
            .attr("fill", random_rgba());
    });

    //Overarching group to prepare for "THE CLICK"
    var labelsGroup = scatterGroup.append("g")
        .attr("transform", `translate(${width/2}, ${height+30})`);

    //Creating labels for each dataset
    var povertyLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("value", "poverty") 
        .classed("active", true)
        .text("In Poverty(%)");
    
    var healthcareLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", (margin.left) * 2.8)
        .attr("y", 0 - (height+72))
        .attr("value", "healthcare") 
        .classed("inactive", true)
        .text("Lacks Healthcare (%)");

    var smokeLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x",(margin.left) * 2.8)
        .attr("y", 0 - (height +92))
        .attr("value", "smokes")
        .classed("active", true)
        .text("Smokes (%)");

    var incomeLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "income")
        .classed("inactive", true)
        .text("Household Income (Median)");

    var obesityLabel = labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", (margin.left) * 2.8)
        .attr("y", 0 - (height +52))
        .attr("value", "obesity")
        .classed("inactive", true)
        .text("Obesity (%)");

    //When an inactive one gets clicked we gotta jump into action
    labelsGroup.selectAll("text")
        .on("click", function() {
            //First lets figure out what they actually clicked
            var selected = d3.select(this).attr("value");
            console.log(selected);

            //Now lets check if its on the x axis
            if (selected == "poverty" || selected == "income"){
                //if it is we can update our chosen x axis
                chosenXAxis = selected;
                //then just call functions and it kinda
                xLinearScale = xScaler(data, chosenXAxis);
                //just waterfalls from there
                xAxis = renderXAxis(xLinearScale, xAxis);

                //Gotta make it obvious which data is shown
                if (selected == "poverty"){
                    povertyLabel.classed("active", true).classed("inactive", false);
                    incomeLabel.classed("active", false).classed("inactive", true);
                }
                else{
                    povertyLabel.classed("active", false).classed("inactive", true);
                    incomeLabel.classed("active", true).classed("inactive", false);
                }
            }
            //Now the same for the y axis
            else {
                chosenYAxis = selected;
                
                yLinearScale = yScaler(data, chosenYAxis);

                yAxis = renderYAxis(yLinearScale, yAxis);

                if (selected == "smokes"){
                    smokeLabel.classed("active", true).classed("inactive", false);
                    healthcareLabel.classed("active", false).classed("inactive", true);
                    obesityLabel.classed("active", false).classed("inactive", true);
                }
                else if (selected == "healthcare"){
                    smokeLabel.classed("active", false).classed("inactive", true);
                    healthcareLabel.classed("active", true).classed("inactive", false);
                    obesityLabel.classed("active", false).classed("inactive", true);
                }
                else {
                    smokeLabel.classed("active", false).classed("inactive", true);
                    healthcareLabel.classed("active", false).classed("inactive", true);
                    obesityLabel.classed("active", true).classed("inactive", false);
                }
            }
            
            //Re-render the circles
            circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale,chosenXAxis,chosenYAxis);
            //Make sure the text follows
            textGroup = renderText(textGroup, xLinearScale, yLinearScale,chosenXAxis,chosenYAxis);


        });
})
.catch(function(error) {
    console.log(error);
});
