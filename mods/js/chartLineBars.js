/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */

var myChart2, options;

options = {
    responsive: true,
    legend: {
        display: false
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};
// Optional configuration
appChart
    .controller("BarLineCtrl", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {



            $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
            this.Datasetclb;
            this.Labelsclb;

            $http({method: 'GET', url: 'mainContent.json'})
                .success(function (data, status, headers, config) {

                    mycharttest = new Chart(document.getElementById("baseX2"),{
                        type: 'line',
                        options: options,
                        data: {
                            labels: data['labels'],
                            datasets: [{
                                fill: true,
                                data: data['series'][0]
                            }]
                        }
                    })
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
    .controller("BarLineCtrl2", ['$scope', '$interval', '$http',
        function ($scope, $interval, $http) {
            $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
            this.Datasetclb2;
            this.Labelsclb2;

            $http({method: 'GET', url: 'mainContenat.json'})
                .success(function (data2, status, headers, config) {

                    this.Datasetclb2 = data2['series'];
                    this.Labelsclb2 = data2['labels'];

                    $scope.data22 = data2['series'];
                    $scope.labels22 = data2['labels'];
                })
                .error(function (data2, status, headers, config) {
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

                $http({method: 'GET', url: 'mainContentRanad.php'})
                    .success(function (data2, status, headers, config) {

                        set1clb2 = Datasetclb2[0];
                        set2clb2 = Datasetclb2[1];

                        set1clb2.shift();
                        set2clb2.shift();
                        set1clb2.push(data2['series'][0][0]);
                        set2clb2.push(data2['series'][1][0]);

                        Dataset2 = [set1clb2,set2clb2];

                        setLabelsclb2 = Labelsclb2;
                        setLabelsclb2.shift();
                        setLabelsclb2.push(data2['labels'][0]);

                        $scope.data22 = Datasetclb2;
                        $scope.labels22 = setLabelsclb2;

                    })
                    .error(function (data2, status, headers, config) {
                        console.log('Data error' + status)
                    });
            }, 72000, $http);
        }])
    .controller('MyController', ['$scope', function($scope) {
        this.data = [{
            key: 'Data',
            values: [{
                x: 0,
                y: 0
            }, {
                x: 1,
                y: 1
            }, {
                x: 2,
                y: 4
            }, {
                x: 3,
                y: 9
            }, {
                x: 4,
                y: 16
            }, {
                x: 5,
                y: 25
            }]
        }];
    }])

    .factory('d3', [function() {
        return d3;
    }])

    .factory('nv', [function() {
        return nv;
    }])

    .directive('lineChart', ['d3', 'nv', function(d3, nv) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                height: '@',
                width: '@'
            },
            template: '<svg ng-attr-height="{{ height }}" ng-attr-width="{{ width }}"></svg>',
            link: function(scope, element) {
                var svg = element.find('svg'),
                    chart;

                var update = function() {
                    d3.select(svg[0])
                        .datum(scope.data)
                        .call(chart);
                };

                scope.$watch(function() { return angular.toJson(scope.data); }, function() {
                    if (chart) {
                        update();
                    }
                });

                scope.$on('chartloaded', update);

                nv.addGraph(function() {
                    chart = nv.models.lineChart()
                        .showLegend(false)
                        .showYAxis(true)
                        .showXAxis(true);

                    chart.xAxis
                        .axisLabel('x')
                        .tickFormat(d3.format('.2f'));

                    chart.yAxis
                        .axisLabel('y')
                        .tickFormat(d3.format('.2f'));

                    nv.utils.windowResize(function() {
                        chart.update()
                    });

                    scope.$emit('chartloaded');

                    return chart;
                });
            }
        }
    }])
;
