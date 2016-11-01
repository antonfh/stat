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
    .controller("BarLineCtrl", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {
            $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
            this.Dataset;
            this.Labels;

            $http({method: 'GET', url: 'mainContent.json'})
                .success(function (data, status, headers, config) {

                    this.Dataset = data['series'];
                    this.Labels = data['labels'];

                    $scope.data = data['series'];
                    $scope.labels = data['labels'];
                })
                .error(function (data, status, headers, config) {
                    console.log('Data error' + status)
                });

            $scope.datasetOverride = [
                {
                    label: "Bar chart",
                    borderWidth: 1,
                    type: 'bar'
                },
                {
                    label: "Line chart",
                    borderWidth: 3,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    type: 'line'
                }
            ];

            // Simulate async data update
            $interval(function () {

                $http({method: 'GET', url: 'mainContentRand.php'})
                    .success(function (data, status, headers, config) {

                        set1 = Dataset[0];
                        set2 = Dataset[1];

                        set1.shift();
                        set2.shift();
                        set1.push(data['series'][0][0]);
                        set2.push(data['series'][1][0]);

                        Dataset = [set1,set2];

                        setLabels = Labels;
                        setLabels.shift();
                        setLabels.push(data['labels'][0]);

                        $scope.data = Dataset;
                        $scope.labels = setLabels;

                    })
                    .error(function (data, status, headers, config) {
                        console.log('Data error' + status)
                    });
            }, 72000, $http);
        }])
;
