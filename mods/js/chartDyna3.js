/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */

var myChartDyna3,
    optionsDyna3,
    update_data3,
    setLabels,
    setSeries,
    Datasetclb3,
    Labelsclb3;

optionsDyna3 = {
    responsive: true,
    title: {
      display: true,
        position: 'top',
        text: 'Update Chart Nr 3'
    },
    legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 99, 132)'
        }
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

update_data3 = function ($http) {

    getDataObj = getData('mainContentRandOneLine.php', $http);

    getDataObj.then(function (datae) {

        Datasetclb3 = datae.data.series;
        Labelsclb3 = datae.data.labels;

    });

    data3 = {
        data3: {
            labels: Labelsclb3,
            data: Datasetclb3
        },
    };

    return data3;
};


// Optional configuration
appChart
    .controller("ChartDyna3",
        ['$scope', '$interval', '$http',
            function ($scope, $interval, $http) {

                setLabels3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                setSeries3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                myChartDyna3 = new Chart(document.getElementById("baseXDyna3"), {
                    type: 'line',
                    options: optionsDyna3,
                    data: {
                        labels: setLabels3,
                        datasets: [{
                            fill: false,
                            data: setSeries3,
                            label: 'Demo',
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            spanGaps: true,
                        }]
                    }
                })


                $interval(function () {
                    dataset3 = update_data3($http);

                    setLabels3.shift();
                    setSeries3.shift();
                    setLabels3.push(dataset3['data3']['labels'][0]);
                    setSeries3.push(dataset3['data3']['data'][0]);

                    myChartDyna3.data.labels = setLabels3;
                    myChartDyna3.data.datasets[0].data = setSeries3;
                    myChartDyna3.update();
                }, 35000);

                update_data3($http);

            }
        ]
    );
