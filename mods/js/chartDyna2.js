/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */

var myChartDyna2,
    optionsDyna2,
    update_data2,
    setLabels,
    setSeries,
    Datasetclb2,
    Labelsclb2;

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

update_data2 = function ($http) {

    getDataObj = getData('mainContentRandOneLine.php', $http);

    getDataObj.then(function (datae) {

        Datasetclb2 = datae.data.series;
        Labelsclb2 = datae.data.labels;

    });

    data2 = {
        data2: {
            labels: Labelsclb2,
            data: Datasetclb2
        },
    };

    return data2;
};


// Optional configuration
appChart
    .controller("ChartDyna2",
        ['$scope', '$interval', '$http',
            function ($scope, $interval, $http) {

                setLabels2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                setSeries2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                myChartDyna2 = new Chart(document.getElementById("baseXDyna2"), {
                    type: 'line',
                    options: optionsDyna2,
                    data: {
                        labels: setLabels2,
                        datasets: [{
                            fill: true,
                            data: setSeries2
                        }]
                    }
                })


                $interval(function () {
                    dataset2 = update_data2($http);

                    setLabels2.shift();
                    setSeries2.shift();
                    setLabels2.push(dataset2['data2']['labels'][0]);
                    setSeries2.push(dataset2['data2']['data'][0]);

                    myChartDyna2.data.labels = setLabels2;
                    myChartDyna2.data.datasets[0].data = setSeries2;
                    myChartDyna2.update();
                }, 75000);

                update_data2($http);

            }
        ]
    );
