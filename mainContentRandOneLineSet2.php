<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');

$rnd1 = rand(-50, 50);
$dte = Date("H:i:s");

$ddata =<<< EOT
{
    "series":[$rnd1],
    "labels":["$dte"]
}
EOT;

echo $ddata;