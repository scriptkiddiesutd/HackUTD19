// Userlist data array for filling in info box
var carListData = [];
var canvas;
var ctx;

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateTable();
  $('#carList table tbody').on('click', 'td a.linkshowcar', showCarInfo);
  canvas = document.getElementById("myChart");
  ctx = canvas.getContext('2d');
  $('#fuelButton').on('click', renderFuelGraph);
  $('#distanceButton').on('click', renderDistanceGraph);
  $('#extraButton').on('click', renderExtraGraph);
  $('#rpmButton').on('click', renderRpmGraph);

});

// Functions =============================================================

function renderFuelGraphWithData(data){
    var x = 'stat'
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [{
               label: 'Fuel Used Vs Time',
               data: data,
               borderColor: "#09b4fe",
               backgroundColor: "#000000",
               fill: false,
               }]
    },
    options: {
                            legend: {
                            labels: {
                            //fontColor: "white",
                            fontSize: 18
                            }
                            },
                            scales: {
                            xAxes: [{
                            gridLines: {
                            //color: 'rgba(255,255,255,255)',
                                    labelFontColor: 'white',
                            ticks: {
                                //fontColor: 'white',
                                    beginAtZero: true
                            },
                            lineWidth: 1
                            }
                            }],
                            yAxes: [{
                            gridLines: {
                            //color: 'rgba(255,255,255,255)',
                            ticks: {
                                    //fontColor: 'white',
                                    beginAtZero: true
                            },
                            lineWidth: 1
                            }
                            }]
                            }
    }
    });
}
function renderFuelGraph(){
  console.log('Fuel clicked');
    var d = [1,2,4,5,2,4,4,4,4,5]
    renderFuelGraphWithData(d);
 }

function renderDistanceGraphWithData(data){
    var x = 'stat'
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [{
               label: 'Distance Vs Time',
               data: data,
               borderColor: "#09b4fe",
               backgroundColor: "#000000",
               fill: false,
               }]
    },
    options: {
    legend: {
    labels: {
    //fontColor: "white",
    fontSize: 18
    }
    },
    scales: {
    xAxes: [{
            gridLines: {
            //color: 'rgba(255,255,255,255)',
            //labelFontColor: 'white',
            ticks: {
            //fontColor: 'white',
            beginAtZero: true
            },
            lineWidth: 1
            }
            }],
    yAxes: [{
            gridLines: {
            //color: 'rgba(255,255,255,255)',
            ticks: {
            //fontColor: 'white',
            beginAtZero: true
            },
            lineWidth: 1
            }
            }]
    }
    }
    });
}
 function renderDistanceGraph(){
  console.log('Distance clicked');
     var d = [3,4,5,6,6,3,3,2,9,10]
     renderDistanceGraphWithData(d);
 }

function renderExtraGraphWithData(data){
    var x = 'stat'
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [{
               label: 'Extra Covered Vs Time',
               data: data,
               borderColor: "#09b4fe",
               backgroundColor: "#000000",
               fill: false,
               }]
    },
    options: {
    legend: {
    labels: {
                            //fontColor: "white",
    fontSize: 18
    }
    },
    scales: {
    xAxes: [{
            gridLines: {
            //color: 'rgba(255,255,255,255)',
            //labelFontColor: 'white',
            ticks: {
            //fontColor: 'white',
            beginAtZero: true
            },
            lineWidth: 1
            }
            }],
    yAxes: [{
            gridLines: {
            //color: 'rgba(255,255,255,255)',
            ticks: {
            //fontColor: 'white',
            beginAtZero: true
            },
            lineWidth: 1
            }
            }]
    }
    }
    });
}
function renderExtraGraph(){
    console.log('Mile Clicked');
    var d = [6,3,2,6,2,4,1,8,9,11]
    renderExtraGraphWithData(d);
}

function renderRpmGraphWithData(data){
    var x = 'stat'
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [{
               label: 'RPM Vs Time',
               data: data,
               borderColor: "#09b4fe",
               backgroundColor: "#000000",
               fill: false,
               }]
    },
    options: {
    legend: {
    labels: {
    //fontColor: "white",
    fontSize: 18
    }
    },
    scales: {
    xAxes: [{
            gridLines: {
            //color: 'rgba(255,255,255,255)',
            //labelFontColor: 'white',
            ticks: {
            //fontColor: 'white',
            beginAtZero: true
            },
            lineWidth: 1
            }
            }],
    yAxes: [{
            gridLines: {
            //color: 'rgba(255,255,255,255)',
            ticks: {
            //fontColor: 'white',
            beginAtZero: true
            },
            lineWidth: 1
            }
            }]
    }
    }
    });
}
function renderRpmGraph(){
    console.log('RPM Clicked');
    var d=[8,6,7,5,7,2,3,1,6]
    renderRpmGraphWithData(d);
}
// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/cars/carlist', function( data ) {

    carListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowcar" rel="' + this.license + '">' + this.license + '</a></td>';
      tableContent += '<td>' + this.carname + '</td>';
      tableContent += '<td><a href="#" class="linkdeletecar" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#carList table tbody').html(tableContent);
  });
};

// Show car Info
function showCarInfo(event) {

  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve username from link rel attribute
  var thisCarName = $(this).attr('rel');

  console.log(thisCarName);

  // Get Index of object based on id value
  var arrayPosition = carListData.map(function(arrayItem) { return arrayItem.license; }).indexOf(thisCarName);

  // Get our User Object
  var thisCarObject = carListData[arrayPosition];

  console.log(arrayPosition);

  //Populate Info Box
  $('#carInfoName').text(thisCarObject.carname);
  $('#carInfoYear').text(thisCarObject.year);
  $('#carInfoLicense').text(thisCarObject.license);
  $('#carInfoMake').text(thisCarObject.make);
  $('#carInfoModel').text(thisCarObject.model);
  $('#carInfoFueleco').text(thisCarObject['fuel-eco']);
}
  
