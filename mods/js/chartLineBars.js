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
            this.Datasetclb;
            this.Labelsclb;

            $http({method: 'GET', url: 'mainContent.json'})
                .success(function (data, status, headers, config) {

                    this.Datasetclb = data['series'];
                    this.Labelsclb = data['labels'];

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
            test = $interval;
            test(function () {

                $http({method: 'GET', url: 'mainContentRand.php'})
                    .success(function (data, status, headers, config) {

                        set1clb = Datasetclb[0];
                        set2clb = Datasetclb[1];

                        set1clb.shift();
                        set2clb.shift();
                        set1clb.push(data['series'][0][0]);
                        set2clb.push(data['series'][1][0]);

                        Dataset = [set1clb,set2clb];

                        setLabelsclb = Labelsclb;
                        setLabelsclb.shift();
                        setLabelsclb.push(data['labels'][0]);

                        $scope.data = Datasetclb;
                        $scope.labels = setLabelsclb;

                    })
                    .error(function (data, status, headers, config) {
                        console.log('Data error' + status)
                    });
            }, 72000, $http);
        }])
;
