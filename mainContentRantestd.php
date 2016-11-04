<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');
$rnd1 = rand(-100, 100);
$rnd2 = rand(-100, 100);
$dte = Date("H:i");


$arr['series'][0] = $rnd1;
$arr['series'][1] = $rnd2;
$arr['labels'] = $dte;



echo json_encode($arr);