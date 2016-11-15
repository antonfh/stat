/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
var myChartDynaPie;

optionsDynaPie = {
    responsive: true,
    elements: {
        points: {
            borderWidth: 1,
            borderColor: 'rgb(0, 0, 0)'
        }
    },

};

// Create app appCharts controller function
appChart
    .controller("pieCtrl",
        ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {

            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];

            var ctrlName = 'pieCtrl';
            /* This simply sets a base set of labels and series data to start of the graph - the $interval function
             below is what runs at set intervals and gets new chart data and updates the chart
             */
            var setLabels = 'setLabels' + ctrlName;
            var setSeries = 'setSeries' + ctrlName;

            setLabels = ['Val X', 'Val Y', 'Val Z'];
            setSeries = [0, 0, 0];

            /*
             This creates a new Chart object, we assign it to a name (here myChartDynaBars) - I would suggest each
             new chart object you create that you give it a distinct name - else you have some data conflicts
             as JS will build all the vars and object on the page - you need to have your vars and objects
             with unique names so the web page knows what is what

             Notice below we have the options and then data items, data is a set of fields again,
             where we define the labels (assigned setLabels) to it and then datasets->data (assigned setSeries to it)
             */
            chartSet = myChartDynaPie; //When you copy this controller - just give the charSet a new name
            chartSet = new Chart(document.getElementById("baseXPie"), {
                type: 'pie', //What chart to create
                options: optionsDynaPie, //Add in any Global options for the chart
                data: { //Your data object, consisting of labels to put on the chart and the datasets
                    labels: setLabels,
                    datasets: [{
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
            var endPoint = 'mainContentRandPieData.php'; // Name of endpoint Script name on other side
            $interval(function () {

                datasetPies = update_data($http, ctrlName, endPoint);
console.log(datasetPies);
                if (typeof datasetPies != 'undefined') {
                    setLabels = datasetPies[ctrlName]['data']['labels'];
                    setSeries = datasetPies[ctrlName]['data']['data'];

                    /* Here we assign the update setLabels then to the labels fields of the myChartDynaBars chart object */
                    chartSet.data.labels = setLabels;

                    /* Here we assign the update setSeries data to the data field of the myChartDynaBars chart object */
                    chartSet.data.datasets.data = setSeries;
                    //chartSet.update();
                }
                //chartSet.update();
            }, 24000); //This is the interval time this function will be run (milliseconds)

            update_data($http, ctrlName, endPoint); //Calls the update_data_series method to update data
        }
        ]);
