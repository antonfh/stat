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
    optionsDyna2,
    update_data2,
    setLabels,
    Datasetclb2a,
    Datasetclb2b,
    Labelsclb2;


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

 Notice the line "options" and there is assigned optionsDyna - thus the object below is then assigned to options later
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
 This is a function you use in the controller below to get new chart data and update the chart

 The function "update_data",  calls another function "getDataSet" (look at mods/getData.js) to get the chart data,
 The data item structure should be some JSON - which would look like:

 {
 "series":[[-44],[63]],
 "labels":["11:25"]
 }

 Remember here you are plotting 2 series to the chart - therefor you have an array [[-44],[63]], we are updating one record
 one plot on the chart at a time with 2 values
 */
update_data2 = function ($http) {

    /*
     This calls the getDataSet method (you pass in the function that is going to return your values - this must
     be an external service that will return the correct format JSON (as explained in function comments above
     */
    getDataObj = getDataSet('mainContentRantestd.php', $http);

    /*
     This takes successfull data return from the getDataSet function and populates the Datasetclb2a and
     Datasetclb2b (you can call it something better) - which simply defined the 2 chartseries data items to sets
     */
    getDataObj.then(function (datae) {

        Datasetclb2a = datae.data.series[0];
        Datasetclb2b = datae.data.series[1];
        Labelsclb2 = datae.data.labels;

    });

    /*
     We create a data2 array object which we are then going to return to the calling instance, this will be used
     in side the main function below
     */
    data2 = {
        data2: {
            labels: Labelsclb2,
            data1: Datasetclb2a,
            data2: Datasetclb2b,
        },
    };

    return data2;
};


/*
 Our app was defined in mods/js/grCtrl.js, the line in that file : var appChart = angular.module("appChart", ["chart.js"]);
 created the angular app - assigned to appChart.

 Now we can extend or use that module definition and call the controller (controller is basically an Angular function
 use to do stuff on the page, in this case creating charts)

 We give our controller a name = here: ChartDyna2, you must use this name in your HTML page to tell the page what
 controller (function) you are using on that section of the page, thus in the HTML (in index.html) you have:

 <div class="grid-stack-item-content" ng-controller="ChartDyna2">

 ng-controller tells the HTML page for that div element my controller is ChartDyna2, and the code below is what will be
 used in this example
 */
appChart
    .controller("ChartDyna2",
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

                 Notice in datasets we have a bar and a line chart, thus you will have 2 chart items on the screen.
                 */
                myChartDyna2 = new Chart(document.getElementById("baseXDyna2"), {
                    type: 'bar',
                    options: optionsDyna2,
                    data: {
                        labels: setLabels2,
                        datasets: [
                            {
                                type: 'bar',
                                label: 'X',
                                data: setSeries2a,
                                backgroundColor: 'rgba(230, 93, 46, 0.45)'
                            },
                            {
                                type: 'line',
                                label: 'Y',
                                data: setSeries2b
                            }
                        ]
                    }
                })


                /*
                 To make sure our chart actually updates every set time (Seconds, minutes etc), we use the $interval
                 function, the function simply takes call function and then the interval time (here 75000)

                 The function itself first gets the data (assigned dataset) - then uses standard shift and push
                 methods on the setLabels and setSeries global objects. In the push method we then add the data to the
                 object.

                 dataset is the data returned from calling update_data and the format is:

                 dataset['data2']['labels'] and
                 dataset2['data2']['data1'][0] and dataset2['data2']['data2'][0]
                 */
                $interval(function () {
                    dataset2 = update_data2($http);

                    setLabels2.shift();
                    setSeries2a.shift();
                    setSeries2b.shift();

                    setLabels2.push(dataset2['data2']['labels'][0]);
                    setSeries2a.push(dataset2['data2']['data1'][0]);
                    setSeries2b.push(dataset2['data2']['data2'][0]);

                    myChartDyna2.data.labels = setLabels2;
                    myChartDyna2.data.datasets[0].data = setSeries2a;
                    myChartDyna2.data.datasets[1].data = setSeries2b;
                    myChartDyna2.update();
                }, 25000);

                update_data2($http);

            }
        ]
    );
