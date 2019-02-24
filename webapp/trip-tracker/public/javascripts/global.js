// Userlist data array for filling in info box
var carListData = [];
var canvas;
var ctx;

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  //populateTable();
  populateDropdown();
  $('#carList table tbody').on('click', 'td a.linkshowcar', showCarInfo);
  $('#carDropdownList div').on('click', 'a.linkshowcar', showCarInfo);
  
  $('#btnAddCar').on('click', addCar);

  canvas = document.getElementById("myChart");
  ctx = canvas.getContext('2d');
  $('#fuelButton').on('click', renderFuelGraph);
  $('#distanceButton').on('click', renderDistanceGraph);
});

// Functions =============================================================

function addCar(event){
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addCar input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all car info into one object
    var newCar = {
      'license': $('#addCar fieldset input#inputCarLicense').val(),
      'carname': $('#addCar fieldset input#inputCarName').val(),
      'make': $('#addCar fieldset input#inputCarMane').val(),
      'model': $('#addCar fieldset input#inputVarModel').val(),
      'year': $('#addCar fieldset input#inputCarYear').val(),
      'tanksize': $('#addCar fieldset input#inputCarTankSize').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newCar,
      url: '/cars/addcar',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addCar fieldset input').val('');

        // Update the table
        populateDropdown();

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
}

function renderFuelGraph(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log('Fuel clicked');
  var data = [1,1,1,1,5,1,1,10,1,1]
  var x = 'stat'
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [{
            label: 'Vs Time',
            data: data,
            borderColor: "#3e95cd",
            fill: false,
        }]
        },
        options: {}
  });
 }

 function renderDistanceGraph(){
  console.log('Distance clicked');
  var data = [1,1,1,1,5,1,1,10,1,1]
  var x = 'stat'
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [{
            label: 'Vs blablabal',
            data: data,
            borderColor: "#3e95cd",
            fill: false,
        }]
        },
        options: {}
  });
 }

function populateDropdown(){
  var listContent = '';

  $.getJSON( '/cars/carlist', function( data ) {

    carListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      listContent += '<a href="#" class="linkshowcar dropdown-item" rel="' + this.license + '">' + this.license + ' - ' + this.carname + '</a>';
    });

    // Inject the whole content string into our existing HTML table
    $('#carDropdownList div').html(listContent);
  });
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
  