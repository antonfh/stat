<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');
$rnd1 = rand(-100, 100);
$rnd2 = rand(-100, 100);
$dte = Date("H:i:s");

$ddata =<<< EOT
{"series":[
[$rnd1],
[$rnd2]
  ]
  ,"labels" : ["$dte"]
}
EOT;


//echo $ddata;


$arr = null;

$arr['series'][0][0] = $rnd1;
$arr['series'][1][0] = $rnd2;
$arr['labels'][0] = $dte;


echo json_encode($arr);