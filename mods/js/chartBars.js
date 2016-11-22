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
var myChartDynaBars,
    optionsDynaBars;

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
optionsDynaBars = {
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
    },
    /* Notice the next block(s) adds a value label to the plot points on the chart -
     in this case it will show a value on the bar and the line chart
     */
    tooltips: {
        enabled: false
    },
    hover: {
        animationDuration: 0
    },
    animation: {
        onComplete: function() {
            this.chart.controller.draw();
            drawValue(this, 1);
        },
        onProgress: function(state) {
            var animation = state.animationObject;
            drawValue(this, animation.currentStep / animation.numSteps);
        }
    }
};


/*
 Encapsulate "appChart" in function block, then define our appChart modules controller action function, the index.html
 file points to the name of the controller here (ChartDynaBars) and uses the function to build the Chart
 */
(function () {
    appChart
        .controller("ChartDynaBars",
            ['$scope', '$interval', '$http',
                function ($scope, $interval, $http) {

                    var ctrlName = 'ChartDynaBars';
                    /* This simply sets a base set of labels and series data to start of the graph - the $interval function
                     below is what runs at set intervals and gets new chart data and updates the chart
                     */
                    var setLabels = 'setLabels' + ctrlName;
                    var setSeries = 'setSeries' + ctrlName;

                    setLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    setSeries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    /*
                     This creates a new Chart object, we assign it to a name (here myChartDynaBars) - I would suggest each
                     new chart object you create that you give it a distinct name - else you have some data conflicts
                     as JS will build all the vars and object on the page - you need to have your vars and objects
                     with unique names so the web page knows what is what

                     Notice below we have the options and then data items, data is a set of fields again,
                     where we define the labels (assigned setLabels) to it and then datasets->data (assigned setSeries to it)
                     */
                    var chartSet = myChartDynaBars; //When you copy this controller - just give the charSet a new name
                    chartSet = new Chart(document.getElementById("ChartDynaBars"), {
                        type: 'bar', //What chart to create
                        options: optionsDynaBars, //Add in any Global options for the chart
                        data: { //Your data object, consisting of labels to put on the chart and the datasets
                            labels: setLabels,
                            datasets: [{
                                fill: true,
                                data: setSeries //Your datasets - data is the totals to plot on chart
                            }]
                        }
                    });


                    /*
                     To make sure our chart actually updates every set time (Seconds, minutes etc), we use the $interval
                     function, the function simply takes call function and then the interval time (here 24000)

                     The function itself first gets the data (assigned datasetBars) - then uses standard shift and push
                     methods on the setLabels and setSeries global objects. In the push method we then add the data to the
                     object.

                     datasetBars is the data returned from calling update_data and the format is:

                     datasetBars[ctrlName]['data']['labels'] and
                     datasetBars[ctrlName]['data']['data']
                     */
                    var endPoint = 'mainContentRandOneLine.php'; // Name of endpoint Script name on other side
                    $interval(function () {

                        datasetBars = update_data($http, ctrlName, endPoint);

                        if (typeof datasetBars != 'undefined') {

                            setLabels.shift();
                            setSeries.shift();
                            setLabels.push(datasetBars[ctrlName]['labels'][0]);
                            setSeries.push(datasetBars[ctrlName]['data'][0]);

                            /* Here we assign the update setLabels then to the labels fields of the myChartDynaBars chart object */
                            chartSet.data.labels = setLabels;

                            /* Here we assign the update setSeries data to the data field of the myChartDynaBars chart object */
                            chartSet.data.datasets[0].data = setSeries;
                            chartSet.update();
                        }
                    }, 24000); //This is the interval time this function will be run (milliseconds)

                    update_data($http, ctrlName, endPoint); //Calls the update_data_series method to update data
                }
            ]
        );
})();
