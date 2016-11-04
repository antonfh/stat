<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');

$rnd1 = rand(-100, 100);
$rnd2 = rand(-100, 100);
$dte = Date("H:i");

$ddata =<<< EOT
{
    "series":['$rnd1'],
    "labels":['$dte']
}
EOT;

echo $ddata;