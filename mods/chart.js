/**
 * Created by Anton on 2016-11-03.
 */

var data = []
for(var i = 1; i <= Math.E; i += 0.01) {
    data.push({x: i, y: Math.log(i)});
}

var data = [{
    key: 'y = log(x)',
    values: data
}];

nv.addGraph(function() {
    var chart = nv.models.lineChart()
        .showLegend(false)
        .showYAxis(true)
        .showXAxis(true);

    chart.xAxis
        .axisLabel('x')
        .tickFormat(d3.format('.2f'));

    chart.yAxis
        .axisLabel('y')
        .tickFormat(d3.format('.2f'));

    d3.select('svg')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(function() {
        chart.update()
    });

    return chart;
});