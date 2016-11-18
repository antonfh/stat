/**
 * @ngdoc controller
 * @name appChart:ChartDyna
 *
 * @description
 *
 *
 * @requires $scope
 * */

/*
 Set some global variables for the chart controller
 */
var myChartDyna,
    optionsDyna;
/*
 ChartJs and the Angular module for ChartJS takes options, you can set a global options object here, refer to:

 https://jtblin.github.io/angular-chart.js/
 http://www.chartjs.org/
 http://www.chartjs.org/docs/

 Remember you are using Angular and the Angular-chartjs module to build the graphs- angular just builds the functionality on top
 of ChartJS - So the options below would be some of the options you would find in ChartJS - refer to: http://www.chartjs.org/docs/

 In the code below where you create the Chart object:

 myChartDyna = new Chart(document.getElementById("baseXDyna"), {
 type: 'line',
 options: optionsDyna,

 Notice the line "options" and there is assigned optionsDyna - thus the object below is then assigned to options later
 */
optionsDyna = {
    backgroundColor: ['rgba(22, 38, 230, 0.45)', 'rgba(230, 195, 107, 0.45)'],
    responsive: true,
    animation: false,
    showLines: true,
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
 Encapsulate appChart in function block, then define our appChart modules controller action function, the index.html
 file points to the name of the controller here (ChartDynaLine) and uses the function to build the Chart
 */
(function () {
    appChart
        .controller("ChartDynaLine",
            ['$scope', '$interval', '$http',
                function ($scope, $interval, $http) {

                    var ctrlName = 'ChartDynaLine';
                    /* This simply sets a base set of labels and series data to start of the graph - the $interval function
                     below is what runs at set intervals and gets new chart data and updates the chart
                     */
                    var setLabels = [];
                    var setSeries = [];

                    setLabels[ctrlName] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    setSeries[ctrlName] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    /*
                     This creates a new Chart object, we assign it to a name (here myChartDyna) - I would suggest each
                     new chart object you create that you give it a distinct name - else you have some data conflicts
                     as JS will build all the vars and object on the page - you need to have your vars and objects
                     with unique names so the web page knows what is what

                     Notice below we have the options and then data items, data is a set of fields again,
                     where we define the labels (assigned setLabels) to it and then datasets->data (assigned setSeries to it)
                     */
                    var chartSet = myChartDyna; //When you copy this controller - just give the charSet a new name
                    chartSet = new Chart(document.getElementById("baseXDyna"), {
                        type: 'line', //What chart to create
                        options: optionsDyna, //Add in any Global options for the chart
                        data: { //Your data object, consisting of labels to put on the chart and the datasets
                            labels: setLabels[ctrlName],
                            datasets: [{
                                fill: true,
                                backgroundColor: 'rgba(22, 38, 230, 0.45)',
                                borderColor: 'rgba(22, 38, 230, 0.45)',
                                data: setSeries[ctrlName] //Your datasets - data is the totals to plot on chart
                            }]
                        }
                    });


                    /*
                     To make sure our chart actually updates every set time (Seconds, minutes etc), we use the $interval
                     function, the function simply takes call function and then the interval time (here 75000)

                     The function itself first gets the data (assigned dataset) - then uses standard shift and push
                     methods on the setLabels and setSeries global objects. In the push method we then add the data to the
                     object.

                     dataset is the data returned from calling update_data and the format is:

                     dataset['data']['labels'] and dataset['data']['data']
                     */
                    var endPoint = 'mainContentRandOneLine.php'; // Name of endpoint Script name on other side
                    $interval(function () {
                        datasetChartDynaLine = update_data($http, ctrlName, endPoint);

                        if (typeof datasetChartDynaLine != 'undefined') {

                            setLabels[ctrlName].shift();
                            setSeries[ctrlName].shift();
                            setLabels[ctrlName].push(datasetChartDynaLine[ctrlName]['labels'][0]);
                            setSeries[ctrlName].push(datasetChartDynaLine[ctrlName]['data'][0]);

                            /* Here we assign the update setLabels then to the labels fields of the myChartDyna chart object */
                            chartSet.data.labels = setLabels[ctrlName];

                            /* Here we assign the update setSeries data to the data field of the myChartDyna chart object */
                            chartSet.data.datasets[0].data = setSeries[ctrlName];
                            chartSet.update();
                        }
                    }, 25000); //This is the interval time this function will be run (milliseconds)

                    update_data($http, ctrlName, endPoint);
                }
            ]
        );
})();

/*
 Second graph controller example with less comments - basically a copy of the above only change the
 getElementById to baseXDyna22 (which is the id for the div block in the index.html)
 */
(function () {
    appChart
        .controller("ChartDynaLine2",
            ['$scope', '$interval', '$http',
                function ($scope, $interval, $http) {

                    var ctrlName = 'ChartDynaLine2';

                    var setLabels = [];
                    var setSeries = [];

                    setLabels[ctrlName] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    setSeries[ctrlName] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    chartSet2 = myChartDyna2; //When you copy this controller - just give the charSet a new name
                    chartSet2 = new Chart(document.getElementById("baseXDyna22"), {
                        type: 'line', //What chart to create
                        options: optionsDyna, //Add in any Global options for the chart
                        data: { //Your data object, consisting of labels to put on the chart and the datasets
                            labels: setLabels[ctrlName],
                            datasets: [{
                                fill: false,
                                backgroundColor: 'rgba(22, 38, 230, 0.45)',
                                borderColor: 'rgba(22, 38, 230, 0.45)',
                                data: setSeries[ctrlName] //Your datasets - data is the totals to plot on chart
                            }]
                        }
                    });

                    var endPoint = 'mainContentRandOneLine.php'; // Name of endpoint Script name on other side
                    $interval(function () {

                        datasetChartDynaLine2 = update_data($http, ctrlName, endPoint);

                        if (typeof datasetChartDynaLine2 != 'undefined') {

                            setLabels[ctrlName].shift();
                            setSeries[ctrlName].shift();
                            setLabels[ctrlName].push(datasetChartDynaLine2[ctrlName]['labels'][0]);
                            setSeries[ctrlName].push(datasetChartDynaLine2[ctrlName]['data'][0]);

                            /* Here we assign the update setLabels then to the labels fields of the myChartDyna chart object */
                            chartSet2.data.labels = setLabels[ctrlName];

                            /* Here we assign the update setSeries data to the data field of the myChartDyna chart object */
                            chartSet2.data.datasets[0].data = setSeries[ctrlName];
                            chartSet2.update();
                        }

                    }, 25000); //This is the interval time this function will be run (milliseconds)

                    update_data($http, ctrlName, endPoint);
                }
            ]
        );
})();
