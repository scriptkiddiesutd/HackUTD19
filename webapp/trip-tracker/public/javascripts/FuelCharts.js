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