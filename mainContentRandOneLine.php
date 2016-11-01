<?php
header("Access-Control-Allow-Origin: http://pdmsssa.dev");
$ddata[0] = '
{
    "series":[89],
    "labels" : ["1"]
}
';

$ddata[1] = '
{
    "series":[-75],
    "labels" : ["2"]
}
';

$ddata[2] = '
{
    "series":[45],
    "labels" : ["3"]
}
';

$ddata[3] = '
{
    "series":[145],
    "labels" : ["4"]
}
';

echo $ddata[rand(0,3)];