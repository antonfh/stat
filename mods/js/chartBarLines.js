/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */

/*
 Set some global variables for the chart controller
 */
var myChartDyna2,
    optionsDyna2;


/*
 ChartJs and the Angular module for ChartJS takes options, you can set a global options object here, refer to:

 https://jtblin.github.io/angular-chart.js/
 http://www.chartjs.org/
 http://www.chartjs.org/docs/

 Remember you are using Angular and the Angular-chartjs module to build the graphs- angular just builds the functionality on top
 of ChartJS - So the options below would be some of the options you would find in ChartJS - refer to: http://www.chartjs.org/docs/

 In the code below where you create the Chart object:

 myChartDyna2 = new Chart(document.getElementById("baseXDyna2"), {
 type: 'bar',
 options: optionsDyna2,
 data: {

 Notice the line "options" and there is assigned optionsDyna2 - thus the object below is then assigned to options later
 */
optionsDyna2 = {
    responsive: true,
    legend: {
        display: false
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};


/*
 Our app was defined in mods/js/grCtrl.js, the line in that file : var appChart = angular.module("appChart", ["chart.js"]);
 created the angular app - assigned to "appChart".

 Now we can extend or use that module definition and call the controller (controller is basically an Angular function
 use to do stuff on the page, in this case creating charts)

 We give our controller a name = here: "ChartDynaBarLines", you must use this name in your HTML page to tell the page what
 controller (function) you are using on that section of the page, thus in the HTML (in index.html) you have:

 <div class="grid-stack-item-content" ng-controller="ChartDynaBarLines">

 ng-controller tells the HTML page for that div element my controller is "ChartDynaBarLines", and the code below is what will be
 used in this example
 */
(function () {
appChart
    .controller("ChartDynaBarLines",
        ['$scope', '$interval', '$http',
            function ($scope, $interval, $http) {

                /*
                 We create a base set of variables to use in the charts
                 */
                setLabels2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                setSeries2a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                setSeries2b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                /*
                 To do a mixed chart - say bar and line, you must defined the main type as bar, then in the
                 data array you define the types you want.

                 See document : http://www.chartjs.org/docs/#chart-configuration-mixed-chart-types

                 Notice in datasets inside of data field, we have a bar and a line chart, thus you will have
                 2 chart items on the screen.
                 */
                var chartSet = myChartDyna2; //When you copy this controller - just give the charSet a new name
                chartSet = new Chart(document.getElementById("baseXDyna2"), {
                    type: 'bar',
                    options: optionsDyna2,
                    data: {
                        labels: setLabels2,
                        datasets: [
                            {
                                type: 'bar',
                                label: 'X',
                                data: setSeries2a,
                                backgroundColor: 'rgba(22, 38, 230, 0.25)'
                            },
                            {
                                type: 'line',
                                label: 'Y',
                                data: setSeries2b,
                                borderColor: 'rgba(87, 87, 87, 0.86)',
                            }
                        ]
                    }
                });

                /*
                 To make sure our chart actually updates every set time (Seconds, minutes etc), we use the $interval
                 function, the function simply takes call function and then the interval time (here 25000)

                 The function itself first gets the data (assigned dataset2) - then uses standard shift and push
                 methods on the setLabels and setSeries global objects. In the push method we then add the data to the
                 object.

                 dataset2 is the data returned from calling update_data and the format is:

                 dataset2[ctrlName]['data']['labels'] and
                 dataset2[ctrlName]['data']['data1'] and
                 dataset2[ctrlName]['data']['data2']
                 */
                var ctrlName = 'ChartDynaBarLines';
                var endPoint = 'mainContentRantestd.php'; // Name of endpoint Script name on other side
                $interval(function () {

                    dataset2 = update_data_series($http, ctrlName, endPoint);

                    setLabels2.shift();
                    setSeries2a.shift();
                    setSeries2b.shift();

                    setLabels2.push(dataset2[ctrlName]['data']['labels']);
                    setSeries2a.push(dataset2[ctrlName]['data']['data1']);
                    setSeries2b.push(dataset2[ctrlName]['data']['data2']);

                    chartSet.data.labels = setLabels2;
                    chartSet.data.datasets[0].data = setSeries2a;
                    chartSet.data.datasets[1].data = setSeries2b;
                    chartSet.update();
                }, 25000);

                update_data_series($http, ctrlName, endPoint); //Calls the update_data_series method to update data
            }
        ]
    );
})();