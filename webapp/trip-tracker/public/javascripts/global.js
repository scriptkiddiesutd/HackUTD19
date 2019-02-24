// Userlist data array for filling in info box
var carListData = [];
var canvas;
var ctx;
var fuelGraphPoints = [];
var distGraphPoints = [];
var extraGraphPoints = [];
var rpmGraphPoints = [];
var timePoints = [0]
var graphStatus = "";
var maxPoints = 10;

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
  $('#btnUpdate').on('click', updateGraph);

});

// Functions =============================================================

function updateGraph(){
        console.log($('#addPoint fieldset input#inputPoint').val());
        var inValue = parseInt($('#addPoint fieldset input#inputPoint').val(),10);
        var i=1;
        var avg = 0;
        //time updated every 30 seconds
        timePoints.push(timePoints[timePoints.length-1]+30)
        switch(graphStatus){
                case 'fuel':
                        fuelGraphPoints.push(inValue);
                        //recalibrating the graph
                        if(fuelGraphPoints.length==19)
                        {
                                var temp = [];
                                var tempTime = [];
                                i=1;
                                while(i!=9)
                                {
                                        avg = ((parseInt(fuelGraphPoints[2])+parseInt(fuelGraphPoints[1])+parseInt(fuelGraphPoints[0]))/3);
                                        console.log(avg)
                                        temp.push(avg);
                                        fuelGraphPoints.shift();
                                        fuelGraphPoints.shift();
                                        timePoints.shift();
                                        tempTime.push(timePoints[0]);
                                        timePoints.shift();
                                        i+=1;
                                }
                                fuelGraphPoints = temp;
                                timePoints = tempTime;
                        }
                        renderFuelGraph();
                        break;
                case 'distance':
                        distGraphPoints.push(inValue);
                        //recalibrating the graph
                        if(distGraphPoints.length==19)
                        {
                                var temp = [];
                                var tempTime = [];
                                i=1;
                                while(i!=9)
                                {
                                        avg = ((parseInt(fuelGraphPoints[2])+parseInt(fuelGraphPoints[1])+parseInt(fuelGraphPoints[0]))/3);
                                        console.log(avg)
                                        temp.push(avg);
                                        distGraphPoints.shift();
                                        distGraphPoints.shift();
                                        timePoints.shift();
                                        tempTime.push(timePoints[0]);
                                        timePoints.shift();
                                        i+=1;
                                }
                                distGraphPoints = temp;
                                timePoints = tempTime;
                        }
                        renderDistanceGraph();
                        break;
                case 'extra':
                        extraGraphPoints.push(inValue);
                        //recalibrating the graph
                        if(extraGraphPoints.length==19)
                        {
                                var temp = [];
                                var tempTime = [];
                                i=1;
                                while(i!=9)
                                {
                                        avg = ((parseInt(fuelGraphPoints[2])+parseInt(fuelGraphPoints[1])+parseInt(fuelGraphPoints[0]))/3);
                                        console.log(avg)
                                        temp.push(avg);
                                        extraGraphPoints.shift();
                                        extraGraphPoints.shift();
                                        timePoints.shift();
                                        tempTime.push(timePoints[0]);
                                        timePoints.shift();
                                        i+=1;
                                }
                                extraGraphPoints = temp;
                                timePoints = tempTime;
                        }
                        renderExtraGraph();
                        break;
                case 'rpm':
                        rpmGraphPoints.push(inValue);
                        //recalibrating the graph
                        if(rpmGraphPoints.length==19)
                        {
                                var temp = [];
                                var tempTime = [];
                                i=1;
                                while(i!=9)
                                {
                                        avg = ((parseInt(fuelGraphPoints[2])+parseInt(fuelGraphPoints[1])+parseInt(fuelGraphPoints[0]))/3);
                                        console.log(avg)
                                        temp.push(avg);
                                        rpmGraphPoints.shift();
                                        rpmGraphPoints.shift();
                                        timePoints.shift();
                                        tempTime.push(timePoints[0]);
                                        timePoints.shift();
                                        i+=1;
                                }
                                rpmGraphPoints = temp;
                                timePoints = tempTime;
                        }
                        renderRpmGraph();
        }
}

function renderFuelGraphWithData(data, time){
    var x = 'stat'
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: time,
    datasets: [{
               label: 'Fuel Used Vs Time',
               data: data,
               borderColor: "#09b4fe",
               backgroundColor: "#000000",
               fill: false,
               }]
    },
    options: {  
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
  graphStatus = "fuel";
  renderFuelGraphWithData(fuelGraphPoints,timePoints);
 }

function renderDistanceGraphWithData(data, time){
    var x = 'stat'
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: time,
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
  graphStatus = "distance";
     renderDistanceGraphWithData(distGraphPoints,timePoints);
 }

function renderExtraGraphWithData(data, time){
    var x = 'stat'
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: time,
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
    graphStatus = "extra";
    renderExtraGraphWithData(extraGraphPoints,timePoints);
}

function renderRpmGraphWithData(data, time){
    var x = 'stat'
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: time,
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
    graphStatus = "rpm"
    renderRpmGraphWithData(rpmGraphPoints,timePoints);
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
  
