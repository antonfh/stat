/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */


// Create app appCharts controller function
appChart
    .controller("pieCtrl", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {
            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];
        }])
;
