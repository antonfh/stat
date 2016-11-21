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
    maintainAspectRatio: false,
    elements: {
        points: {
            borderWidth: 1,
            borderColor: 'rgb(0, 0, 0)'
        }
    },
    legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 99, 132)'
        }
    },
    hover: {
        animationDuration: 0
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var allData = data.datasets[tooltipItem.datasetIndex].data;
                var tooltipLabel = data.labels[tooltipItem.index];
                var tooltipData = allData[tooltipItem.index];
                var total = 0;
                for (var i in allData) {
                    total += allData[i];
                }
                var tooltipPercentage = Math.round((tooltipData / total) * 100);
                return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
            }
        }
    },
    animation: {
        duration: 500,
        easing: "easeOutQuart",
        onComplete: function () {
            var ctx = this.chart.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset) {

                for (var i = 0; i < dataset.data.length; i++) {
                    var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                        total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                        mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
                        start_angle = model.startAngle,
                        end_angle = model.endAngle,
                        mid_angle = start_angle + (end_angle - start_angle)/2;

                    var x = mid_radius * Math.cos(mid_angle);
                    var y = mid_radius * Math.sin(mid_angle);

                    ctx.fillStyle = '#fff';
                    if (i == 3){ // Darker text color for lighter background
                        ctx.fillStyle = '#444';
                    }
                    var percent = String(Math.round(dataset.data[i]/total*100)) + "%";
                    ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                    // Display percent in another line, line break doesn't work for fillText
                    ctx.fillText(percent, model.x + x, model.y + y + 15);
                }
            });
        }
    }
};

// Create app appCharts controller function
appChart
    .controller("pieCtrl",
        ['$scope', '$interval', '$http',
            function ($scope, $interval, $http) {

                var ctrlName = 'pieCtrl';
                /* This simply sets a base set of labels and series data to start of the graph - the $interval function
                 below is what runs at set intervals and gets new chart data and updates the chart
                 */
                var setLabels = ['Val X', 'Val Y', 'Val Z'];
                var setSeries = [40, 40, 20];

                /*
                 This creates a new Chart object, we assign it to a name (here myChartDynaPie) - I would suggest each
                 new chart object you create that you give it a distinct name - else you have some data conflicts
                 as JS will build all the vars and object on the page - you need to have your vars and objects
                 with unique names so the web page knows what is what

                 Notice below we have the options and then data items, data is a set of fields again,
                 where we define the labels (assigned setLabels) to it and then datasets->data (assigned setSeries to it)
                 */
                var ctx = document.getElementById("baseXPie").getContext('2d');
                var chartSetDynaPie = new Chart(ctx, {
                    type: 'pie',
                    options: optionsDynaPie, //Add in any Global options for the chart
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

                 The function itself first gets the data (assigned datasetPies) - then uses standard shift and push
                 methods on the setLabels and setSeries global objects. In the push method we then add the data to the
                 object.

                 datasetPies is the data returned from calling update_data and the format is:

                 datasetPies[ctrlName]['data']['labels'] and
                 datasetPies[ctrlName]['data']['data']
                 */
                var endPoint = 'mainContentRandPieData.php'; // Name of endpoint Script name on other side
                $interval(function () {

                    datasetPies = update_data($http, ctrlName, endPoint);

                    if (typeof datasetPies != 'undefined') {
                        setLabels = datasetPies[ctrlName]['labels'];
                        setSeries = datasetPies[ctrlName]['data'];

                        /* Here we assign the update setLabels then to the labels fields of the myChartDynaPie chart object */
                        chartSetDynaPie.data.labels = setLabels;

                        /* Here we assign the update setSeries data to the data field of the myChartDynaPie chart object */
                        chartSetDynaPie.data.datasets[0].data = setSeries;
                        chartSetDynaPie.update();
                    }
                    chartSetDynaPie.update();
                }, 24000); //This is the interval time this function will be run (milliseconds)

                update_data($http, ctrlName, endPoint); //Calls the update_data_series method to update data
            }
        ]);
