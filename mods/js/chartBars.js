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
    .controller("BarChart1", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {

            this.DatasetLineChart1;
            this.LabelsLineChart1;

            // bar chart
           /* this.chartistbarData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                series: [
                    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
                ]
            };
*/
            $http({method: 'GET', url: 'mainContentOneLinejson.php'})
                .success(function (data, status, headers, config) {

                    this.DatasetLineChart1 = data['series'];
                    this.LabelsLineChart1 = data['labels'];

                    $scope.databc = data['series'];
                    $scope.labelsbc = data['labels'];

                    this.chartistbarData = data;
                })
                .error(function (data, status, headers, config) {
                    console.log('Data error' + status)
                });

            this.Type = 'Line';

          /*  this.barOptions = {
                seriesBarDistance: 12
            };
            */
            this.barResponsiveOptions = [
                ['screen and (min-width: 641px) and (max-width: 1024px)', {
                    seriesBarDistance: 55,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value;
                        }
                    }
                }],
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 55,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value[0];
                        }
                    }
                }]
            ];

            this.chartOptions = {
                showArea: true,
                axisY: {
                    onlyInteger: true
                },

                plugins: [
                    Chartist.plugins.zoom({ onZoom: function(chart, reset) { storeReset(reset);} }),
                    Chartist.plugins.ctPointLabels({
                        labelClass: 'ct-label-point',
                        labelOffset: {
                            x: -2,
                            y: -3
                        },
                        textAnchor: 'left'
                    }),
                    Chartist.plugins.ctThreshold({
                        threshold: 6
                    })
                ]
            };

            $http({method: 'GET', url: 'mainContentOneLinejson.php'})
                .success(function (data, status, headers, config) {

                    this.DatasetLineChart1 = data['series'];
                    this.LabelsLineChart1 = data['labels'];

                    $scope.data = data['series'];
                    $scope.labels = data['labels'];
                })
                .error(function (data, status, headers, config) {
                    console.log('Data error' + status)
                });


            // Simulate async data update
            chartbars = $interval;

            chartbars(function () {

                $http({method: 'GET', url: 'http://psapi.anton.co.za/mainContentRandOneLine.php'})
                    .success(function (data, status, headers, config) {

                        set1 = DatasetLineChart1;
                        set1.shift();
                        set1.push(data['series'][0]);

                        DatasetLineChart1 = set1;

                        setLabelsLineChart1 = LabelsLineChart1;
                        setLabelsLineChart1.shift();
                        setLabelsLineChart1.push(data['labels'][0]);

                        $scope.data = DatasetLineChart1;
                        $scope.labels = setLabelsLineChart1;

                    })
                    .error(function (data, status, headers, config) {
                        console.log('Data error' + status)
                    });
            }, 72000, $http);

        }]
    )
;
