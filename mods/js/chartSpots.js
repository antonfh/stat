/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */

appChart
    .controller("LineCtrl", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {

            this.Dataset1;
            this.Labels1;
            
            $scope.series = ['Series A', 'Series B'];

            $http({method: 'GET', url: 'mainContent.json'})
            .success(function (data, status, headers, config) {
                this.Dataset1 = data['series'];
                this.Labels1 = data['labels'];

                $scope.data = data['series'];
                $scope.labels = data['labels'];

            })
            .error(function (data, status, headers, config) {
                console.log('Data error' + status)
            });


            // Simulate async data update
            $interval(function () {

                $http({method: 'GET', url: 'mainContentRand.php'})
                .success(function (data, status, headers, config) {

                    set1 = Dataset1[0];
                    set2 = Dataset1[1];

                    set1.shift();
                    set2.shift();
                    set1.push(data['series'][0][0]);
                    set2.push(data['series'][1][0]);

                    Dataset1 = [set1,set2];

                    setLabels = Labels1;
                    setLabels.shift();
                    setLabels.push(data['labels'][0]);

                    $scope.data = Dataset1;
                    $scope.labels = setLabels;

                })
                .error(function (data, status, headers, config) {
                    console.log('Data error' + status)
                });
            }, 72000, $http);
        }]
    )
;



