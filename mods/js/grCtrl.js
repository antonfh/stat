/**
 * @ngdoc controller
 * @name myapp:grCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */

/*
 You create an app variable - which all controllers later in your javascript files will used to define their
 .controllers methods from - review the other mods/js (chartDyna.js for example

 Look at: https://docs.angularjs.org/tutorial

 Basically you define a new angular module and assign it to a var (appChart here) you can also tell the module what
 other Angular modules to add to yours (here we are adding chart.js) this is simply to allow us to use an
 external angular module (3rd party created module) in our own app
 */
var appChart = angular.module("appChart", ["chart.js"]); //Define the angular module and give it a name = appChart
var callURI = 'http://psapi.anton.co.za/';
// Module configuration  - Notice that we now use the appChart name to extend the module and run the config function
appChart.config(['ChartJsProvider', function (ChartJsProvider) {

    // Configure all charts - global configuration option for Chatjs angular module
    ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#FF8A80'],
        responsive: true,
        animation: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        showLines: true
    });
}]);

/*
    This is only for cross site JSON calls via GET - to help with some servers blocking calls - might not work in all cases
 */
appChart.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);



