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
    .controller("BarChartHoriz1", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {

            $scope.colorsbc = ['#45b7cd', '#ff6384', '#ff8e72'];

            this.DatasetLineChart1;
            this.LabelsLineChart1;


            $http({method: 'GET', url: 'mainContentOneLine.json'})
                .success(function (data, status, headers, config) {

                    this.DatasetLineChart1 = data['series'];
                    this.LabelsLineChart1 = data['labels'];

                    $scope.databc = data['series'];
                    $scope.labelsbc = data['labels'];
                })
                .error(function (data, status, headers, config) {
                    console.log('Data error' + status)
                });



            // Simulate async data update
            chartHoriz = $interval;
            chartHoriz(function () {

                $http({method: 'GET', url: 'http://psapi.anton.co.za/mainContentRandOneLine.php'})
                    .success(function (data, status, headers, config) {

                        set1 = DatasetLineChart1;
                        set1.shift();
                        set1.push(data['series'][0]);

                        DatasetLineChart1 = set1;

                        setLabelsLineChart1 = LabelsLineChart1;
                        setLabelsLineChart1.shift();
                        setLabelsLineChart1.push(data['labels'][0]);

                        $scope.databc = DatasetLineChart1;
                        $scope.labelsbc = setLabelsLineChart1;

                    })
                    .error(function (data, status, headers, config) {
                        console.log('Data error' + status)
                    });
            }, 72000, $http);

            $scope.datasetOverridebc = [
                {
                    label: "Line chart",
                    borderWidth: 3,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    type: 'line'
                }
            ];

        }])
;
