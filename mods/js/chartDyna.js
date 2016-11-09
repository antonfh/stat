/**
 * @ngdoc controller
 * @name appChart:ChartDyna
 *
 * @description
 *
 *
 * @requires $scope
 * */

var myChartDyna,
    optionsDyna,
    update_data,
    setLabels,
    setSeries,
    Datasetclb,
    Labelsclb;

optionsDyna = {
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

(function () {
    update_data = function ($http) {

        getDataObj = getData('mainContentRandOneLine.php', $http);

        getDataObj.then(function (datae) {

            Datasetclb = datae.data.series;
            Labelsclb = datae.data.labels;

        });

        data = {
            data: {
                labels: Labelsclb,
                data: Datasetclb
            },
        };

        return data;
    };
})();


(function () {
    appChart
        .controller("ChartDyna",
            ['$scope', '$interval', '$http',
                function ($scope, $interval, $http) {

                    setLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    setSeries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    myChartDyna = new Chart(document.getElementById("baseXDyna"), {
                        type: 'line',
                        options: optionsDyna,
                        data: {
                            labels: setLabels,
                            datasets: [{
                                fill: true,
                                data: setSeries
                            }]
                        }
                    });


                    $interval(function () {
                        dataset = update_data($http);

                        setLabels.shift();
                        setSeries.shift();
                        setLabels.push(dataset['data']['labels'][0]);
                        setSeries.push(dataset['data']['data'][0]);

                        myChartDyna.data.labels = setLabels;
                        myChartDyna.data.datasets[0].data = setSeries;
                        myChartDyna.update();
                    }, 75000);

                    update_data($http);
                }
            ]
        );
})();
