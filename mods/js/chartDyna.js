/**
 * @ngdoc controller
 * @name appChart:ChartDyna
 *
 * @description
 *
 *
 * @requires $scope
 * */

/*
    Set some global variables for the chart controller
 */
var myChartDyna,
    optionsDyna,
    update_data,
    setLabels,
    setSeries,
    Datasetclb,
    Labelsclb;

/*
    ChartJs and the Angular module for ChartJS takes options, you can set a global options object here, refer to:

 https://jtblin.github.io/angular-chart.js/
 http://www.chartjs.org/
 http://www.chartjs.org/docs/

 Remember you are using Angular and the Angular-chartjs module to build the graphs- angular just builds the functionality on top
 of ChartJS - So the options below would be some of the options you would find in ChartJS - refer to: http://www.chartjs.org/docs/

 In the code below where you create the Chart object:

 myChartDyna = new Chart(document.getElementById("baseXDyna"), {
 type: 'line',
 options: optionsDyna,

 Notice the line "options" and there is assigned optionsDyna - thus the object below is then assigned to options later
 */
optionsDyna = {
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
(function () {
    update_data = function ($http) {

        /* Gets the data object - JSON, returning series and labels, as explained in comment above*/
        getDataObj = getData('mainContentRandOneLine.php', $http);

        /*
            This simply takes the returned data object (getDataObj) and assigns the result (the series and labels data)
            from the returned JSON string to the global variables Datasetclb and Labelsclb
         */
        getDataObj.then(function (datae) {

            Datasetclb = datae.data.series;
            Labelsclb = datae.data.labels;

        });

        /* We define the data object, assigned the data labels and data fields. Notice you will use data then in the
            controller - where you created the Chart object to assign it then to what data the chart will show

         $interval(function () {
         dataset = update_data($http);

            This function in the controller calls this function and gets dataset, then uses variable dataset to assign
            the Series and Label data
         */
        data = {
            data: {
                labels: Labelsclb,
                data: Datasetclb
            },
        };

        return data;
    };
})();

/*

 */
(function () {
    appChart
        .controller("ChartDyna",
            ['$scope', '$interval', '$http',
                function ($scope, $interval, $http) {

                    /* This simply sets a base set of labels and series data to start of the graph - the $interval function
                        below is what runs at set intervals and gets new chart data and updates the chart
                     */
                    setLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    setSeries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                    /*
                        This creates a new Chart object, we assign it to a name (here myChartDyna) - I would suggest each
                        new chart object you create that you give it a distinct name - else you have some data conflicts
                        as JS will build all the vars and object on the page - you need to have your vars and objects
                        with unique names so the web page knows what is what

                        Notice below we have the options and then data items, data is a set of fields again,
                        where we define the labels (assigned setLabels) to it and then datasets->data (assigned setSeries to it)
                     */
                    myChartDyna = new Chart(document.getElementById("baseXDyna"), {
                        type: 'line',
                        options: optionsDyna,
                        data: {
                            labels: setLabels,
                            datasets: [{
                                fill: true,
                                data: setSeries
                            }]
                        }
                    });


                    /*
                        To make sure our chart actually updates every set time (Seconds, minutes etc), we use the $interval
                        function, the function simply takes call function and then the interval time (here 75000)

                        The function itself first gets the data (assigned dataset) - then uses standard shift and push
                        methods on the setLabels and setSeries global objects. In the push method we then add the data to the
                        object.

                        dataset is the data returned from calling update_data and the format is:

                        dataset['data']['labels'] and ['data']
                     */
                    $interval(function () {
                        dataset = update_data($http);

                        setLabels.shift();
                        setSeries.shift();
                        setLabels.push(dataset['data']['labels'][0]);
                        setSeries.push(dataset['data']['data'][0]);

                        /* Here we assign the update setLabels then to the labels fields of the myChartDyna chart object */
                        myChartDyna.data.labels = setLabels;

                        /* Here we assign the update setSeries data to the data field of the myChartDyna chart object */
                        myChartDyna.data.datasets[0].data = setSeries;
                        myChartDyna.update();
                    }, 75000); //This is the interval time this function will be run (milliseconds)

                    update_data($http);
                }
            ]
        );
})();
