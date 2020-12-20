// from data.js
var tableData = data;

var tbody = d3.select("#ufo-table");

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

makeTable(tableData);


 function filterTime() {
    d3.event.preventDefault();
    var dateFilter = d3.select('#datetime').property('value');
    console.log(dateFilter);
    var filteredEntries = tableData.filter(entry => entry.datetime === dateFilter);
    console.log(filteredEntries);
    makeTable(filteredEntries);
};


var filterButton = d3.select('#filter-btn');
var form = d3.select('#form');
filterButton.on("click", filterTime);
form.on("submit", filterTime);
