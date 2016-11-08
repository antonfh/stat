/**
 * Created by Anton on 2016-11-03.
 */
function getData(call, $http) {

    return $http({method: 'GET', url: 'http://psapi.anton.co.za/' + call + ''})
        .success(function (datas, status, headers, config, scopedataset) {
            sc = {scopedata: datas['series'], scopelabels: datas['labels']};

        })
        .error(function (datas, status, headers, config) {
            console.log('Data error' + status + ' Data- ' . datas)
        });
};