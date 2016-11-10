/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */


// appChart controller defined
appChart
    .controller("doughnutCtrl", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {
            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];
        }])
;
