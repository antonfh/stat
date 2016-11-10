/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */


// Define appChart controller function - polarCtrl
appChart
    .controller("polarCtrl", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {
            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
            $scope.data = [300, 500, 100, 40, 120];
        }])
;
