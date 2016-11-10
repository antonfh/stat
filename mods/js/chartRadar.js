/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */


// appCharts controller radarCtrl
appChart
    .controller("radarCtrl", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {
            $scope.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

            $scope.chartType = 'Bar';
            $scope.data = [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ];
        }])
;
