/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
var myChartDynaPolar;

optionsDynaPolar = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        points: {
            borderWidth: 1,
            borderColor: 'rgb(0, 0, 0)'
        }
    },

};

// Define appChart controller function - polarCtrl
appChart
    .controller("polarCtrl", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {

            var ctrlName = 'polarCtrl';
            /* This simply sets a base set of labels and series data to start of the graph - the $interval function
             below is what runs at set intervals and gets new chart data and updates the chart
             */
            var setLabels = ['Val X', 'Val Y', 'Val Z'];
            var setSeries = [40, 40, 20];

            /*
             This creates a new Chart object, we assign it to a name (here chartSetDynaPolar) - I would suggest each
             new chart object you create that you give it a distinct name - else you have some data conflicts
             as JS will build all the vars and object on the page - you need to have your vars and objects
             with unique names so the web page knows what is what

             Notice below we have the options and then data items, data is a set of fields again,
             where we define the labels (assigned setLabels) to it and then datasets->data (assigned setSeries to it)
             */
            var ctx = document.getElementById("baseXPolar").getContext('2d');
            var chartSetDynaPolar = new Chart(ctx, {
                type: 'polar',
                options: optionsDynaPolar, //Add in any Global options for the chart
                data: {
                    labels: setLabels,
                    datasets: [{
                        backgroundColor: [
                            "#2ecc71",
                            "#3498db",
                            "#34495e"
                        ],
                        data: setSeries
                    }]
                }
            });

            /*
             To make sure our chart actually updates every set time (Seconds, minutes etc), we use the $interval
             function, the function simply takes call function and then the interval time (here 24000)

             The function itself first gets the data (assigned datasetPolar) - then uses standard shift and push
             methods on the setLabels and setSeries global objects. In the push method we then add the data to the
             object.

             datasetPolar is the data returned from calling update_data and the format is:

             datasetPolar[ctrlName]['data']['labels'] and
             datasetPolar[ctrlName]['data']['data']
             */
            var endPoint = 'mainContentRandPolarData.php'; // Name of endpoint Script name on other side
            $interval(function () {

                datasetPolar = update_data($http, ctrlName, endPoint);

                if (typeof datasetPolar != 'undefined') {
                    setLabels = datasetPolar[ctrlName]['labels'];
                    setSeries = datasetPolar[ctrlName]['data'];

                    /* Here we assign the update setLabels then to the labels fields of the myChartDynaBars chart object */
                    chartSetDynaPolar.data.labels = setLabels;

                    /* Here we assign the update setSeries data to the data field of the myChartDynaBars chart object */
                    chartSetDynaPolar.data.datasets[0].data = setSeries;
                    chartSetDynaPolar.update();
                }
                chartSetDynaPolar.update();
            }, 24000); //This is the interval time this function will be run (milliseconds)

            update_data($http, ctrlName, endPoint); //Calls the update_data_series method to update data
        }])
;
