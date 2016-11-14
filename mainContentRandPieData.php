<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');

$rnd1 = rand(-100, 100);
$rnd2 = rand(-100, 100);
$rnd3 = rand(-100, 100);
$dte = Date("H:i:s");

$ddata =<<< EOT
{
    "series":[$rnd1, $rnd2, $rnd3],
    "labels":["Val X", "Val Y", "Val Z"]
}
EOT;

echo $ddata;