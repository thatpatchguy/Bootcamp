// Get data from data.js
var tableData = data;

// Get table body from html to work with
var tbody = d3.select("#ufo-table-body");

//Function to display desired data
function makeTable(ufoData){
    tbody.html('');
    ufoData.forEach(function(sighting){
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
    });
    });
};

// Starts the page with all data from data.js
makeTable(tableData);

// Function to filter dependent on what is entered
 function filterTime() {
    d3.event.preventDefault();
    var fullFilter = tableData;
    var dateFilter = d3.select('#datetime').property('value');
    var cityFilter = d3.select('#city').property('value');
    var stateFilter = d3.select('#state').property('value');
    var countryFilter = d3.select('#country').property('value');
    var shapeFilter = d3.select('#shape').property('value');

    if (dateFilter != ''){
        fullFilter = fullFilter.filter(entry => entry.datetime === dateFilter);
        console.log(fullFilter);
    }
    if (cityFilter != ''){
        fullFilter = fullFilter.filter(entry => entry.city === cityFilter);
        console.log(fullFilter);
    }
    if (stateFilter != ''){
        fullFilter = fullFilter.filter(entry => entry.state === stateFilter);
        console.log(fullFilter);
    }
    if (countryFilter != ''){
        fullFilter = fullFilter.filter(entry => entry.country === countryFilter);
        console.log(fullFilter);
    }
    if (shapeFilter != ''){
        fullFilter = fullFilter.filter(entry => entry.shape === shapeFilter);
        console.log(fullFilter);
    }
    //End of function calls function to create table based on what data is left after filter
    makeTable(fullFilter);
};

// Calls filter function on form submission
var filterButton = d3.select('#filter-btn');
var form = d3.select('#form');
filterButton.on("click", filterTime);
form.on("submit", filterTime);
