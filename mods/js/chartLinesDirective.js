/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */


// Optional configuration
appChart
    .controller("LineDirective", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {

            $scope.myData = {
                // Chart.js data structure goes here
                // e.g. Pie Chart Data Structure http://www.chartjs.org/docs/#doughnut-pie-chart-data-structure
                labels: [
                    "Red",
                    "Blue",
                    "Yellow"
                ],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }
                ]
            };

            $scope.myOptions =  {
                // Chart.js options go here
                // e.g. Pie Chart Options http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
            };

            $scope.onChartClick = function (event) {
                console.log(event);
            };


        }])
;
