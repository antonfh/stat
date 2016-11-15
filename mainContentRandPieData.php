<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');
$rnd1 = rand(0, 25);
$rnd2 = rand(26, 75);
$rnd3 = rand(75, 100);

$arr = null;

$arr['series'][0] = $rnd1;
$arr['series'][1] = $rnd2;
$arr['series'][2] = $rnd3;
$arr['labels'][0] = 'X';
$arr['labels'][1] = 'Y';
$arr['labels'][2] = 'Z';

echo json_encode($arr);