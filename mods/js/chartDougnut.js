/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
optionsDynaRadar = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        points: {
            borderWidth: 1,
            borderColor: 'rgb(0, 0, 0)'
        }
    },

};

// appChart controller defined
appChart
    .controller("doughnutCtrl", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {
            $scope.labels = ["Calls in", "Calls out", "Physical"];
            $scope.data = [300, 500, 100];
        }])
;
