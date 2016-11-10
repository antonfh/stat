/**
 * Created by Anton on 2016-11-03.
 */


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
function getData(call, $http) {

    return $http(
        {
            method: 'GET',
            url: 'http://psapi.anton.co.za/' + call + ''
        })
        .success(function (datas) {

            sc = {
                    scopedata: datas['series'],
                    scopelabels: datas['labels']
            };
        })
        .error(function (datas, status) {
            console.log('Data error' + status + ' Data- ' . datas)
        });
};

/*
    Same function as above, but this will return 2 series items
 */
function getDataSet(call, $http) {

    return $http(
        {
            method: 'GET',
            url: 'http://psapi.anton.co.za/' + call + ''
        })
        .success(function (datas) {

            console.log(datas);
            sc = {
                scopedata1: datas['series'][0],
                scopedata2: datas['series'][1],
                scopelabels: datas['labels']
            };
        })
        .error(function (datas, status) {
            console.log('Data error' + status + ' Data- ' . datas)
        });
};