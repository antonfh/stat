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
    .controller("LineCtrl2", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {
            $scope.colors = ['#ff6384', '#ff8e72'];
            this.DatasetLineChart1;
            this.LabelsLineChart1;


            $scope.datasetOverridecl = [
                {
                    label: "Line chart",
                    borderWidth: 3,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,0.6)",
                    type: 'BarCtrl'
                }
            ];

            $http({method: 'GET', url: 'mainContentOneLinejson.php'})
                .success(function (datalc1, status, headers, config) {
                    this.DatasetLineChart1 = datalc1['series'];
                    this.LabelsLineChart1 = datalc1['labels'];

                    $scope.data1 = datalc1['series'];
                    $scope.labels1 = datalc1['labels'];
                })
                .error(function (datalc1, status, headers, config) {
                    console.log('Data error' + status)
                });


            // Simulate async data update
            chartlines = $interval;
            charthttp = $http;
            chartlines(function () {

                charthttp({method: 'GET', url: 'http://psapi.anton.co.za/mainContentRandOneLine.php'})
                    .success(function (datacl) {

                        set1 = DatasetLineChart1;
                        set1.shift();
                        set1.push(datacl['series'][0]);

                        DatasetLineChart1 = set1;

                        setLabelsLineChart1 = LabelsLineChart1;
                        setLabelsLineChart1.shift();
                        setLabelsLineChart1.push(datacl['labels'][0]);

                        $scope.data1 = DatasetLineChart1;
                        $scope.labels1 = setLabelsLineChart1;

                    })
                    .error(function (datacl, status) {

                        console.log('Data error' + status)
                    });
            }, 72000);


        }])
;
