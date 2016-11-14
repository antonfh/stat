<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');
$rnd1 = rand(-100, 100);
$rnd2 = rand(-100, 100);
$rnd3 = rand(-100, 100);

$arr = null;

$arr['series'][0][0] = $rnd1;
$arr['series'][1][0] = $rnd2;
$arr['series'][2][0] = $rnd3;
$arr['labels'][0][0] = 'X';
$arr['labels'][1][0] = 'Y';
$arr['labels'][2][0] = 'Z';

echo json_encode($arr);