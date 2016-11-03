<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');

$ddata =<<< EOT
{"series":[
['rand(-100, 100)'],
['rand(-100, 100)']
  ]
  ,"labels" : ['Date("H:i")']
}
EOT;


echo $ddata;