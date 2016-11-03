/**
 * Created by Anton on 2016-11-03.
 */
function getData(call, $http) {

    return $http({method: 'GET', url: 'http://psapi.anton.co.za/' + call + ''})
        .success(function (data, status, headers, config, scopedataset) {
            sc = {scopedata: data['series'], scopelabels: data['labels']};
            console.log('getData-' + call);
            console.log(data);
        })
        .error(function (data, status, headers, config) {
            console.log('Data error' + status + ' Data- ' . data)
        });
};