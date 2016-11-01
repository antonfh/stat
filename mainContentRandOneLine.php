<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');

$ddata = '
{"series":[
[' . rand(-100, 100) . ']
  ]
  ,"labels" : ["' . Date("H:i") . '"]
}
';


echo $ddata;