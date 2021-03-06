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
 You create an app variable (called appChart here) and defined it as a angular Module (angular.module() )
  - which all controllers later in your javascript files will used to define their
 .controllers methods from - review the other mods/js (chartDyna.js for example

 Look at: https://docs.angularjs.org/tutorial

 Basically you define a new angular module and assign it to a var (appChart here) you can also tell the module what
 other Angular modules to add to yours (here we are adding chart.js) this is simply to allow us to use an
 external angular module (3rd party created module) in our own app
 */
var appChart = angular.module("appChart", ["chart.js"]); //Define the angular module and give it a name = appChart
var callURI = 'http://psapi.anton.co.za/'; //Change this to your server which will return JSON data


// Module configuration  - Notice that we now use the appChart name to extend the module and run the config function
appChart.config(['ChartJsProvider', function (ChartJsProvider) {

    // Configure all charts - global configuration option for Chatjs angular module
    /*ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#FF8A80'],
        responsive: true,
        animation: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        showLines: true
    });*/
}]);

/*
    This is only for cross site JSON calls via GET - to help with some servers blocking calls - might not work in all cases
 */
appChart.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

/*
    The Following functions and variables are used as configuration and options used by the Bar and Line chart
    options to set the value labels on the chart plots.
 */


// Font color for values inside the bar - White is 255,255,255, black is 0,0,0
var insideFontColor = '0,0,0';
// Font color for values above the bar
var outsideFontColor = '175,175,175';
// How close to the top edge bar can be before the value is put inside it
var topThreshold = 20;

var modifyCtx = function(ctx) {
    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'x-small', Chart.defaults.global.defaultFontFamily);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    return ctx;
};

var fadeIn = function(ctx, obj, x, y, black, step) {
    var ctx = modifyCtx(ctx);
    var alpha = 0;
    ctx.fillStyle = black ? 'rgba(' + outsideFontColor + ',' + step + ')' : 'rgba(' + insideFontColor + ',' + step + ')';
    ctx.fillText(obj, x, y);
};

var drawValue = function(context, step) {
    var ctx = context.chart.ctx;

    context.data.datasets.forEach(function (dataset) {
        for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
            var textY = (model.y > topThreshold) ? model.y - 3 : model.y + 20;
            fadeIn(ctx, dataset.data[i], model.x, textY, model.y > topThreshold, step);
        }
    });
};

