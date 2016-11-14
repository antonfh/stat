/**
 * Created by Anton on 2016-11-03.
 */

/*
 This is a function you use in the controller below to get new chart data and update the chart

 The function "update_data",  calls another function "getData" (look at mods/getData,js) to get the chart data,
 The data item structure should be some JSON - which would look like:

 {
 "series":[-76],
 "labels":["09:02:16"]
 }
 This will add one element to the chart, you have your labels and then your series which is your data to plot
 */
update_data = function ($http, unid, endPointFile) {

    var data = [];

    /* Gets the data object - JSON, returning series and labels, as explained in comment above*/
    var randomtime = (Math.random() * (100 - 10 + 1) ) << 0;
    window.setTimeout(function () {
    }, randomtime);

    getDataObjLine = getData(endPointFile, $http);

    var seriesData = getDataObjLine.series[0];
    var seriesLabels = getDataObjLine.labels[0];

    data[unid] = {
        data: {
            labels: seriesLabels,
            data: seriesData
        },
    };

    return data;
};


/* For series data with 2 series elements - call update_data_series*/

/*
 This is a function you use in the controller below to get new chart data and update the chart

 The function "update_data",  calls another function "getDataSet" (look at mods/getData.js) to get the chart data,
 The data item structure should be some JSON - which would look like:

 {
    "series":[
        [-44],
        [63]
    ],
    "labels":["11:25"]
 }

 Remember here you are plotting 2 series to the chart - therefor you have an array [[-44],[63]], we are updating one record
 one plot on the chart at a time with 2 values
 */
update_data_series = function ($http, unid, endPointFile) {

    var datas = [];

    /* Gets the data object - JSON, returning series and labels, as explained in comment above*/
    var randomtime = (Math.random() * (100 - 10 + 1) ) << 0;
    window.setTimeout(function () {
    }, randomtime);
    /*
     This calls the getDataSet method (you pass in the function that is going to return your values - this must
     be an external service that will return the correct format JSON (as explained in function comments above
     */
    getDataObj = getDataSet(endPointFile, $http);

    /*
     This takes successfull data return from the getDataSet function and populates the Datasetclb2a and
     Datasetclb2b (you can call it something better) - which simply defined the 2 chartseries data items to sets
     */
    var seriesDataS1 = getDataObj.series[0][0];
    var seriesDataS2 = getDataObj.series[1][0];
    var labelsDataS = getDataObj.labels[0];

    /*
     We create a data2 array object which we are then going to return to the calling instance, this will be used
     in side the main function below
     */
    datas[unid] = {
        data: {
            labels: labelsDataS,
            data1: seriesDataS1,
            data2: seriesDataS2,
        },
    };

    return datas;
}


/*
 Function which gets the data from the external service - in JSON, which is used by Charts.

 Data must be series and labels (thus the call (basically an Ajax call to the url defined) returns the JSON string)

 $http is the function here that takes a method (GET in this case) and the url, where to get data

 On sucess it then assign data to the sc variable (with items scopedata (Assigned the data series) and
 scopelabels (assigned the labels series)

 The external service must return the data in the following format:

 {
 "series":[-29],
 "labels":["09:58:47"]
 }

 In the success function below notice we have datas as first parameter - this is the data object returned from the call
 Notice in the success function we use datas['series'] and datas['labels']

 This function only returns data for single item Charts. Thus we have one series item and one labels
 */
var returnData = {'labels': 0, 'series': 0};
function getData(call, $http) {

    var labels = 0;
    var series = 0;

    $httpData = $http(
        {
            method: 'GET',
            url: callURI + call + ''
        })
        .success(function (datas) {

            sc = {
                scopedata: datas['series'],
                scopelabels: datas['labels']
            };
        })
        .error(function (datas, status) {
            console.log('Data error' + status + ' Data- '.datas)
        });

    $httpData.then(function (datae) {

        labels = datae['data']['labels'];
        series = datae['data']['series'];

        returnData = {'labels': labels, 'series': series};
    });

    return returnData;
};

/*
 Same function as above, but this will return 2 series items
 */
var returnDataSet = {'labels': 0, 'series': [0, 0]};
function getDataSet(call, $http) {

    var labels = 0;
    var series1 = 0;
    var series2 = 0;

    $httpDataSet = $http(
        {
            method: 'GET',
            url: callURI + call + ''
        })
        .success(function (datas) {

            sc = {
                scopedata1: datas['series'][0],
                scopedata2: datas['series'][1],
                scopelabels: datas['labels']
            };
        })
        .error(function (datas, status) {
            console.log('Data error' + status + ' Data- '.datas)
        });

    $httpDataSet.then(function (datae) {

        labels = datae['data']['labels'];
        series1 = datae['data']['series'][0];
        series2 = datae['data']['series'][1];

        returnDataSet = {'labels': labels, 'series': [series1, series2]};
    });

    return returnDataSet;
};