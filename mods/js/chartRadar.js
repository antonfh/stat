/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
var chartSetDynaRadar;

optionsDynaRadar = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        points: {
            borderWidth: 1,
            borderColor: 'rgb(0, 0, 0)'
        }
    },

};

// Create app appCharts controller function
appChart
    .controller("radarCtrl",
        ['$scope', '$interval', '$http',
            function ($scope, $interval, $http) {

                var ctrlName = 'radarCtrl';
                /* This simply sets a base set of labels and series data to start of the graph - the $interval function
                 below is what runs at set intervals and gets new chart data and updates the chart
                 */
                var setLabels = ['Val X', 'Val Y', 'Val Z'];
                var setSeries = [40, 40, 20];
                var setSeries2 = [10, 10, 80];

                /*
                 This creates a new Chart object, we assign it to a name (here chartSetDynaRadar) - I would suggest each
                 new chart object you create that you give it a distinct name - else you have some data conflicts
                 as JS will build all the vars and object on the page - you need to have your vars and objects
                 with unique names so the web page knows what is what

                 Notice below we have the options and then data items, data is a set of fields again,
                 where we define the labels (assigned setLabels) to it and then datasets->data (assigned setSeries to it)
                 */
                var ctxr = document.getElementById("radarX").getContext('2d');
                var chartSetDynaRadar = new Chart(ctxr, {
                    type: 'radar',
                    options: optionsDynaRadar, //Add in any Global options for the chart
                    data: {
                        labels: setLabels,
                        datasets: [
                            {
                                label: "Set 1",
                                backgroundColor: "rgba(179,181,198,0.2)",
                                data: setSeries
                            },
                            {
                                label: "Set 2",
                                backgroundColor: "rgba(255,99,132,0.2)",
                                data: setSeries2
                            }
                        ]
                    }
                });

                /*
                 To make sure our chart actually updates every set time (Seconds, minutes etc), we use the $interval
                 function, the function simply takes call function and then the interval time (here 24000)

                 The function itself first gets the data (assigned datasetRadar) - then uses standard shift and push
                 methods on the setLabels and setSeries global objects. In the push method we then add the data to the
                 object.

                 datasetBars is the data returned from calling update_data and the format is:

                 datasetBars[ctrlName]['data']['labels'] and
                 datasetBars[ctrlName]['data']['data']
                 */
                var endPoint = 'mainContentRandRadarData.php'; // Name of endpoint Script name on other side
                $interval(function () {

                    datasetRadar = update_data($http, ctrlName, endPoint);

                    if (typeof datasetRadar != 'undefined') {
                        setLabels = datasetRadar[ctrlName]['labels'];
                        setSeries = datasetRadar[ctrlName]['data'][0];
                        setSeries2 = datasetRadar[ctrlName]['data'][1];

                        /* Here we assign the update setLabels then to the labels fields of the myChartDynaBars chart object */
                        chartSetDynaRadar.data.labels = setLabels;

                        /* Here we assign the update setSeries data to the data field of the myChartDynaBars chart object */
                        chartSetDynaRadar.data.datasets[0].data = setSeries;
                        chartSetDynaRadar.data.datasets[1].data = setSeries2;
                        chartSetDynaRadar.update();
                    }
                    chartSetDynaRadar.update();
                }, 24000); //This is the interval time this function will be run (milliseconds)

                update_data($http, ctrlName, endPoint); //Calls the update_data_series method to update data
            }
        ]);
